/**
 * Regression: the update card has exactly two paths — the host route, then the
 * terminal command. There is no plugin-market probe in between, and the command
 * always names the version the card offered.
 *
 * The host is the only automatic route: a browser cannot install a package, and
 * the panel never runs a package manager itself. When the host answers 501, or
 * refuses with a code a terminal can get past, the card states the command and
 * copies a ready-to-paste prompt.
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = fs.readFileSync(path.join(root, 'client', 'client.js'), 'utf8')

/** A prerelease any published build treats as an offered update. */
const NEXT = '9.9.9-beta.1'
const PROFILE = '/Users/example/.dsh/profiles/desktop'

const json = (status, body) => ({ ok: status >= 200 && status < 300, status, json: async () => body })
const wait = (window, ms) => new Promise(resolve => window.setTimeout(resolve, ms))

/**
 * Boot the shipped bundle in jsdom, open the panel and its settings card, and
 * hand back the pieces a test needs. `apply` decides what the host's update
 * route answers; every market URL is recorded and must stay unused.
 */
async function boot(t, apply) {
  const dom = new JSDOM(
    '<!doctype html><html><body><div class="_headerUtilities"></div></body></html>',
    { url: 'https://example.test/', pretendToBeVisual: true, runScripts: 'outside-only' },
  )
  const { window } = dom
  t.after(() => window.close())
  globalThis.window = window
  globalThis.document = window.document
  globalThis.IS_REACT_ACT_ENVIRONMENT = true

  const React = await import('react')
  const ReactDOM = await import('react-dom')
  const ReactDOMClient = await import('react-dom/client')
  const { act } = React

  const calls = []
  window.fetch = async (input, init = {}) => {
    const url = String(input)
    calls.push({ url, method: init.method || 'GET' })
    if (url.startsWith('https://registry.npmjs.org/')) return json(200, { version: NEXT })
    if (url.startsWith('https://registry.npmmirror.com/')) return json(404, {})
    if (url.startsWith('https://api.github.com/')) return json(200, [])
    if (url === '/dsh-aside-note/update/apply' && init.method === 'POST') return apply(JSON.parse(init.body))
    return json(404, {})
  }

  let loaded = null
  window.__ModuleLoader__ = { load: spec => { loaded = spec } }
  window.eval(bundle)
  assert.equal(loaded.id, 'dsh-aside-note')

  const moduleTable = {
    react: React,
    'react-dom': ReactDOM,
    'react-dom/client': ReactDOMClient,
    '@deepseek-ai/dsh-client-ui-primitives': {},
  }
  const exported = loaded.factory(id => {
    if (!(id in moduleTable)) throw new Error(`module table cannot answer ${id}`)
    return moduleTable[id]
  })

  const disposers = []
  const registered = []
  const ctx = {
    get: name => (name === 'locale'
      ? { bind: () => key => key, register: () => {}, getLocale: () => ({ id: 'zh' }) }
      : undefined),
    effect: fn => {
      const dispose = fn()
      if (typeof dispose === 'function') disposers.push(dispose)
    },
    slots: {
      inject: (name, factory) => factory(),
      register: (meta, component) => {
        registered.push({ meta, component })
        return () => {}
      },
    },
  }
  await act(async () => { exported.apply(ctx) })

  const capture = registered.find(entry => entry.meta.name === 'conversation.composer.dock').component
  const container = document.createElement('div')
  document.body.appendChild(container)
  const reactRoot = ReactDOMClient.createRoot(container)
  await act(async () => {
    reactRoot.render(React.createElement(capture, { sessionId: 'session-1' }))
  })

  await act(async () => { document.querySelector('._headerUtilities > .dsh-an-headerBtn').click() })
  const popover = document.querySelector('.dsh-an-popover')
  assert.ok(popover, 'clicking the entry opens the panel')
  await act(async () => { popover.querySelector('.dsh-an-settingsBtn').click() })

  const until = async (probe, timeout) => {
    const startedAt = Date.now()
    for (;;) {
      let value = null
      await act(async () => { value = probe() })
      if (value) return value
      assert.ok(Date.now() - startedAt < timeout, 'the card never reached the expected state')
      await act(async () => { await wait(window, 60) })
    }
  }

  const dispose = async () => {
    await act(async () => { reactRoot.unmount() })
    for (const item of disposers) item()
    dom.window.close()
  }

  return { window, act, popover, calls, until, dispose }
}

const clipboard = window => {
  const copied = []
  Object.defineProperty(window.navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async text => { copied.push(text) } },
  })
  return copied
}

test('a host with no update route hands over the offered version, without touching the market', async t => {
  const hint = `npx -y --registry=https://registry.npmjs.org/ dsh-aside-note@${NEXT} install --version ${NEXT} --profile-dir "${PROFILE}"`
  const { window, act, popover, calls, until, dispose } = await boot(t, () => json(501, {
    ok: false,
    code: 'AUTO_UPDATE_UNAVAILABLE',
    message: 'this host offers no installer for the running profile',
    retryable: false,
    hint,
  }))

  const updateButton = await until(() => popover.querySelector('.dsh-an-updatePrimary'), 4000)
  assert.equal(updateButton.textContent, '立即更新')
  await act(async () => { updateButton.click() })

  const fallback = await until(() => popover.querySelector('.dsh-an-updateFallback'), 4000)
  assert.match(popover.textContent, /没有可用的自动更新通道/, 'the card names the reason')
  assert.ok(fallback.textContent.includes(hint), 'the host command is shown verbatim')
  assert.equal(calls.filter(call => call.url.includes('/dsh-market/')).length, 0,
    'the market must not be probed')

  const copied = clipboard(window)
  await act(async () => { fallback.querySelector('.dsh-an-updateCopy').click() })
  await act(async () => { await wait(window, 20) })
  assert.equal(copied.length, 1)
  assert.ok(copied[0].includes(NEXT), 'the prompt names the offered version')
  assert.ok(copied[0].includes(hint), 'the prompt carries the exact command')
  await dispose()
})

test('a prerelease host hint without the npmjs pin is replaced by the pinned command', async t => {
  // An older host half pins the version but not the registry. Handing that hint
  // over would let npx fetch the stable installer and miss the prerelease.
  const stale = `npx -y dsh-aside-note install --version ${NEXT} --profile-dir "${PROFILE}"`
  const { act, popover, until, dispose } = await boot(t, () => json(501, {
    ok: false,
    code: 'AUTO_UPDATE_UNAVAILABLE',
    message: 'this host offers no installer for the running profile',
    retryable: false,
    hint: stale,
  }))

  const updateButton = await until(() => popover.querySelector('.dsh-an-updatePrimary'), 4000)
  await act(async () => { updateButton.click() })
  const fallback = await until(() => popover.querySelector('.dsh-an-updateFallback'), 4000)

  assert.ok(!fallback.textContent.includes(stale), 'the stale hint is not rendered verbatim')
  assert.match(fallback.textContent, /--registry=https:\/\/registry\.npmjs\.org\//)
  assert.match(fallback.textContent, /dsh-aside-note@9\.9\.9-beta\.1/)
  assert.match(fallback.textContent, /--version 9\.9\.9-beta\.1/)
  await dispose()
})

test('a host refusal a terminal can get past uses the pinned command', async t => {
  const { window, act, popover, calls, until, dispose } = await boot(t, () => json(409, {
    ok: false,
    code: 'OPERATION_BUSY',
    message: 'another update is already running',
    retryable: true,
  }))

  const updateButton = await until(() => popover.querySelector('.dsh-an-updatePrimary'), 4000)
  await act(async () => { updateButton.click() })

  const fallback = await until(() => popover.querySelector('.dsh-an-updateFallback'), 4000)
  assert.match(popover.textContent, /更新正在执行另一个任务/, 'the host lock is reported')
  // The host sent no hint for this code, so the card pins the offered version
  // itself; a prerelease also names npmjs so npx cannot pick the stable line.
  assert.match(fallback.textContent, /npx -y --registry=https:\/\/registry\.npmjs\.org\//)
  assert.match(fallback.textContent, new RegExp(`dsh-aside-note@${NEXT.replaceAll('.', '\\.')}`))
  assert.match(fallback.textContent, new RegExp(`--version ${NEXT.replaceAll('.', '\\.')}`))
  assert.equal(calls.filter(call => call.url.includes('/dsh-market/')).length, 0,
    'the market is never probed')

  const copied = clipboard(window)
  await act(async () => { fallback.querySelector('.dsh-an-updateCopy').click() })
  await act(async () => { await wait(window, 20) })
  assert.match(copied[0], new RegExp(`--version ${NEXT.replaceAll('.', '\\.')}`), 'the prompt pins the version')
  await dispose()
})

test('a successful host update offers the page refresh instead of a command', async t => {
  const { window, act, popover, until, dispose } = await boot(t, () => json(200, {
    ok: true,
    route: 'dsh',
    previousVersion: '9.9.8',
    installedVersion: NEXT,
    updated: true,
    restartRequired: true,
  }))

  const updateButton = await until(() => popover.querySelector('.dsh-an-updatePrimary'), 4000)
  await act(async () => { updateButton.click() })

  const refresh = await until(() => [
    ...popover.querySelectorAll('.dsh-an-updatePrimary'),
  ].find(node => node.textContent === '刷新页面'), 4000)
  assert.ok(refresh, 'the finished host update offers a page refresh')
  assert.equal(popover.querySelector('.dsh-an-updateFallback'), null, 'no command is needed after success')
  await dispose()
})
