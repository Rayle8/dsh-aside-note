/**
 * The update endpoints, called the way the panel calls them.
 *
 * What matters here is not the install (that is `host-update.test.mjs`) but the
 * fence around it: a page from another origin must not be able to trigger a
 * package install, a downgrade must be refused rather than obeyed, and two
 * clicks must not run two installs over the same profile.
 */
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

import { APPLY_PATH, PROBE_PATH, registerUpdateRoutes } from '../host/route.js'

const ORIGIN = { host: '127.0.0.1:61433', origin: 'http://127.0.0.1:61433', 'sec-fetch-site': 'same-origin' }

/** A profile on disk with this package installed at `version`. */
function makeProfile(t) {
  const dir = mkdtempSync(join(tmpdir(), 'aside-note-profile-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  writeFileSync(join(dir, 'package.json'), JSON.stringify({
    name: 'dsh-profile-desktop',
    dependencies: { 'dsh-aside-note': '1.1.1' },
    dsh: { profile: { bundles: ['dsh-aside-note'] } },
  }))
  const installed = join(dir, 'node_modules', 'dsh-aside-note')
  mkdirSync(installed, { recursive: true })
  writeFileSync(join(installed, 'package.json'), JSON.stringify({ name: 'dsh-aside-note', version: '1.1.1' }))
  return dir
}

/** Mount the routes on a stand-in for the host web server. */
function mount(dir, installer, { connection = { requestRejection: () => undefined }, onProfileRead = () => {} } = {}) {
  const routes = new Map()
  const server = {
    register(route) {
      routes.set(route.path, route)
      return () => routes.delete(route.path)
    },
  }
  const ctx = {
    get: name => {
      if (name === 'profileContext') {
        onProfileRead()
        return { dir }
      }
      if (name === 'pluginManager') return installer
      if (name === 'connection') return connection ?? undefined
      return undefined
    },
  }
  registerUpdateRoutes(server, { ctx, config: {} })
  return routes
}

/** Call one mounted handler and collect what it answered. */
async function call(routes, path, { method = 'POST', headers = ORIGIN, body, onBodyRead = () => {} } = {}) {
  const handler = routes.get(path)
  assert.ok(handler, `no route at ${path}`)
  const payload = body === undefined ? '' : JSON.stringify(body)
  const request = {
    method,
    headers,
    async *[Symbol.asyncIterator]() {
      onBodyRead()
      if (payload !== '') yield Buffer.from(payload)
    },
  }
  let status
  let text = ''
  const response = {
    writeHead(code) {
      status = code
      return response
    },
    end(chunk) {
      text = chunk === undefined ? '' : String(chunk)
    },
  }
  await handler.handler(request, response)
  return { status, body: text === '' ? undefined : JSON.parse(text) }
}

test('an install through the route reports the verified result', async t => {
  const dir = makeProfile(t)
  const routes = mount(dir, {
    installBundle: async () => ({ application: 'applied' }),
  })
  // The installer in this test does not touch the disk, so the verified read
  // stays at 1.1.1 and the route must refuse to call that a success.
  const refused = await call(routes, APPLY_PATH, { body: { target: '1.1.2' } })
  assert.equal(refused.status, 502)
  assert.equal(refused.body.code, 'RESOLVED_VERSION_MISMATCH')
})

test('a cross-site request cannot start an install', async t => {
  const dir = makeProfile(t)
  let installed = false
  const routes = mount(dir, { installBundle: async () => { installed = true; return { application: 'applied' } } }, {
    connection: { requestRejection: request => request.headers['sec-fetch-site'] === 'cross-site' ? 403 : undefined },
  })
  const answer = await call(routes, APPLY_PATH, {
    headers: { host: '127.0.0.1:61433', origin: 'https://different.example', 'sec-fetch-site': 'cross-site' },
    body: { target: '1.1.2' },
  })
  assert.equal(answer.status, 403)
  assert.equal(answer.body.code, 'UPDATE_FORBIDDEN')
  assert.equal(installed, false)
})

const updateRequests = [
  { path: PROBE_PATH, method: 'GET' },
  { path: APPLY_PATH, method: 'POST', body: { target: '1.1.2' } },
]

test('UPD-009 未通过 DSH 鉴权时拒绝更新探测和安装', async t => {
  const dir = makeProfile(t)
  const onProfileRead = t.mock.fn()
  const onBodyRead = t.mock.fn()
  const installBundle = t.mock.fn()
  for (const [status, headers] of [
    [401, ORIGIN],
    [401, { host: ORIGIN.host }],
    [403, { host: 'different.example' }],
  ]) {
    const connection = {
      requestRejection: t.mock.fn(function (request) {
        assert.equal(this, connection)
        assert.equal(request.headers, headers)
        return status
      }),
    }
    const routes = mount(dir, { installBundle }, { connection, onProfileRead })
    for (const { path, ...options } of updateRequests) {
      const answer = await call(routes, path, { ...options, headers, onBodyRead })
      assert.deepEqual(answer, { status, body: { ok: false, code: 'UPDATE_FORBIDDEN' } })
    }
    assert.equal(connection.requestRejection.mock.callCount(), updateRequests.length)
  }
  assert.equal(onProfileRead.mock.callCount(), 0)
  assert.equal(onBodyRead.mock.callCount(), 0)
  assert.equal(installBundle.mock.callCount(), 0)
})

test('UPD-010 已认证请求没有 Origin 时仍可探测和安装', async t => {
  const dir = makeProfile(t)
  const headers = { host: ORIGIN.host }
  t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => ({ version: '1.1.2' }) }))
  const installBundle = t.mock.fn(async () => {
    writeFileSync(join(dir, 'node_modules', 'dsh-aside-note', 'package.json'), JSON.stringify({ version: '1.1.2' }))
    return { application: 'applied' }
  })
  const routes = mount(dir, { installBundle })

  const probe = await call(routes, PROBE_PATH, { method: 'GET', headers })
  assert.equal(probe.status, 200)
  assert.equal(probe.body.installed, '1.1.1')
  assert.equal(probe.body.latest, '1.1.2')
  assert.equal(probe.body.updateSupported, true)

  const apply = await call(routes, APPLY_PATH, { headers, body: { target: '1.1.2' } })
  assert.equal(apply.status, 200)
  assert.equal(apply.body.installedVersion, '1.1.2')
  assert.equal(installBundle.mock.callCount(), 1)
})

test('UPD-011 DSH 鉴权不可用时拒绝更新探测和安装', async t => {
  const dir = makeProfile(t)
  const onProfileRead = t.mock.fn()
  const installBundle = t.mock.fn()
  for (const connection of [null, {}, { requestRejection: () => { throw new Error('connection unavailable') } }]) {
    const routes = mount(dir, { installBundle }, { connection, onProfileRead })
    for (const { path, ...options } of updateRequests) {
      const answer = await call(routes, path, options)
      assert.deepEqual(answer, { status: 403, body: { ok: false, code: 'UPDATE_FORBIDDEN' } })
    }
  }
  assert.equal(onProfileRead.mock.callCount(), 0)
  assert.equal(installBundle.mock.callCount(), 0)
})

test('a range is not a target', async t => {
  const dir = makeProfile(t)
  const routes = mount(dir, { installBundle: async () => ({ application: 'applied' }) })
  const answer = await call(routes, APPLY_PATH, { body: { target: '^1.1.2' } })
  assert.equal(answer.status, 400)
  assert.equal(answer.body.code, 'UPDATE_REJECTED')
})

test('a downgrade is refused, not obeyed', async t => {
  const dir = makeProfile(t)
  const routes = mount(dir, { installBundle: async () => ({ application: 'applied' }) })
  const answer = await call(routes, APPLY_PATH, { body: { target: '1.1.0' } })
  assert.equal(answer.status, 409)
  assert.equal(answer.body.code, 'DOWNGRADE_DETECTED')
})

test('a second click during an install is answered busy', async t => {
  const dir = makeProfile(t)
  let release
  const gate = new Promise(resolve => {
    release = resolve
  })
  const routes = mount(dir, {
    installBundle: async () => {
      await gate
      return { application: 'failed', error: { code: 'bundle-in-use' } }
    },
  })
  const first = call(routes, APPLY_PATH, { body: { target: '1.1.2' } })
  // Let the first request reach its install step before the second arrives.
  await new Promise(resolve => setTimeout(resolve, 20))
  const second = await call(routes, APPLY_PATH, { body: { target: '1.1.2' } })
  assert.equal(second.status, 409)
  assert.equal(second.body.code, 'OPERATION_BUSY')
  release()
  const settled = await first
  assert.equal(settled.status, 502)
  assert.equal(settled.body.code, 'bundle-in-use')
  assert.equal(settled.body.retryable, true)
  assert.match(settled.body.hint, /^npx -y dsh-aside-note install --version 1\.1\.2 --profile-dir /,
    'a refusal a terminal can get past carries the exact command')
})

test('the probe reports the profile and refuses a checkout install', async t => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: false }))
  const dir = makeProfile(t)
  writeFileSync(join(dir, 'package.json'), JSON.stringify({
    name: 'dsh-profile-desktop',
    dependencies: { 'dsh-aside-note': 'link:../checkout' },
    dsh: { profile: { bundles: ['dsh-aside-note'] } },
  }))
  const routes = mount(dir, undefined)
  const answer = await call(routes, PROBE_PATH, { method: 'GET' })
  assert.equal(answer.status, 200)
  assert.equal(answer.body.mode, 'link')
  assert.equal(answer.body.updateSupported, false)
  assert.equal(answer.body.reason, 'linked-or-manual')
})
