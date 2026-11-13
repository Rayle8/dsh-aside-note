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
function mount(dir, installer) {
  const routes = new Map()
  const server = {
    register(route) {
      routes.set(route.path, route)
      return () => routes.delete(route.path)
    },
  }
  const ctx = {
    get: name => {
      if (name === 'profileContext') return { dir }
      if (name === 'pluginManager') return installer
      return undefined
    },
  }
  registerUpdateRoutes(server, { ctx, config: {} })
  return routes
}

/** Call one mounted handler and collect what it answered. */
async function call(routes, path, { method = 'POST', headers = ORIGIN, body } = {}) {
  const handler = routes.get(path)
  assert.ok(handler, `no route at ${path}`)
  const payload = body === undefined ? '' : JSON.stringify(body)
  const request = {
    method,
    headers,
    async *[Symbol.asyncIterator]() {
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
  const routes = mount(dir, { installBundle: async () => { installed = true; return { application: 'applied' } } })
  const answer = await call(routes, APPLY_PATH, {
    headers: { host: '127.0.0.1:61433', origin: 'https://evil.example', 'sec-fetch-site': 'cross-site' },
    body: { target: '1.1.2' },
  })
  assert.equal(answer.status, 403)
  assert.equal(answer.body.code, 'UPDATE_FORBIDDEN')
  assert.equal(installed, false)
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
})

test('the probe reports the profile and refuses a checkout install', async t => {
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
