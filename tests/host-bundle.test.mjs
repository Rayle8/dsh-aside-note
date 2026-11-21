/**
 * Browser-half integration for the host switch: the built bundle boots against
 * a fake `/dsh-aside-note/store` endpoint backed by the real host store code.
 *
 * These cover the three states that matter: migrate-and-switch, refuse-to-switch
 * (stay on localStorage), and already-switched-but-unavailable (error state,
 * no writes anywhere).
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import { createStore } from '../host/store.js'
import { fakeCtx, fakeDomain } from './fake-store.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = fs.readFileSync(path.join(root, 'client', 'client.js'), 'utf8')

const STORE_PATH = '/dsh-aside-note/store'
const LOCATION_PATH = `${STORE_PATH}/location`
const REVEAL_PATH = `${STORE_PATH}/reveal`
const SESSION_KEY = 'dsh.aside-note'
const MODE_KEY = 'dsh.aside-note.storage-mode'

const json = (status, body) => ({ ok: status >= 200 && status < 300, status, json: async () => body })

/** Boot the built bundle in a fresh jsdom realm. */
async function setup(options = {}) {
  const dom = new JSDOM(
    '<!doctype html><html><body><div class="_headerUtilities"></div></body></html>',
    { url: 'https://example.test/', pretendToBeVisual: true, runScripts: 'outside-only' },
  )
  const { window } = dom
  globalThis.window = window
  globalThis.document = window.document
  globalThis.IS_REACT_ACT_ENVIRONMENT = true

  if (options.legacyNote) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify({
      version: 1,
      sessions: {
        'session-1': {
          sessionId: 'session-1',
          updatedAt: 1,
          items: [{ id: 'seed', text: '旧便笺', done: false, createdAt: 1, updatedAt: 1 }],
        },
      },
    }))
  }
  if (options.markedHost) window.localStorage.setItem(MODE_KEY, 'host')

  const domain = fakeDomain()
  const store = createStore(fakeCtx(domain))
  const calls = []
  if (options.hostSeed) {
    for (const [sessionId, items] of Object.entries(options.hostSeed.sessions || {})) {
      await store.apply({
        op: 'list.patch',
        kind: 'session',
        listKey: sessionId,
        order: items.map(item => item.id),
        upserts: items,
      })
    }
  }
  window.fetch = async (input, init = {}) => {
    const url = String(input)
    const method = init.method || 'GET'
    calls.push({ url, method })
    if (url === STORE_PATH) {
      await options.beforeStore?.(method, init.body)
      if (options.storeDown) {
        return json(503, {
          ok: false,
          code: options.storeCode || 'STORE_UNAVAILABLE',
          message: options.storeCode === 'STORE_OPEN_FAILED' ? 'aside_note.json cannot be opened' : 'storage is not mounted',
        })
      }
      if (method === 'GET') {
        const snapshot = await store.snapshot()
        return json(200, { ok: true, ...snapshot })
      }
      const result = await store.apply(JSON.parse(init.body))
      return json(200, { ok: true, ...result })
    }
    if (url === LOCATION_PATH) {
      return json(200, {
        ok: true,
        path: options.storePath || null,
        exists: options.storePath ? options.storePathExists !== false : false,
        backend: options.storePath ? 'json' : null,
      })
    }
    if (url === REVEAL_PATH) {
      return options.revealDown
        ? json(502, { ok: false, code: 'STORE_REVEAL_FAILED', message: 'no file manager' })
        : json(200, { ok: true })
    }
    // The panel's update check must not reach the network in this realm.
    return json(404, {})
  }

  let loaded = null
  window.__ModuleLoader__ = { load: spec => { loaded = spec } }
  window.eval(bundle)
  const React = await import('react')
  const ReactDOM = await import('react-dom')
  const ReactDOMClient = await import('react-dom/client')
  const { act } = React
  const moduleTable = {
    react: React,
    'react-dom': ReactDOM,
    'react-dom/client': ReactDOMClient,
    '@deepseek-ai/dsh-client-ui-primitives': {},
  }
  const requireShim = id => {
    if (!(id in moduleTable)) throw new Error(`module table cannot answer ${id}`)
    return moduleTable[id]
  }
  const exported = loaded.factory(requireShim)

  const registered = []
  const locale = {
    bind: () => key => key,
    register: () => {},
    getLocale: () => ({ id: 'zh' }),
  }
  const ctx = {
    get: name => (name === 'locale' ? locale : undefined),
    effect: fn => {
      const dispose = fn()
      if (typeof dispose === 'function') dispose()
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
  // Let the boot probe, migration and ready notification settle.
  await act(async () => { await new Promise(resolve => window.setTimeout(resolve, 60)) })

  const settle = async (ms = 40) => {
    await act(async () => { await new Promise(resolve => window.setTimeout(resolve, ms)) })
  }

  const openPanel = async () => {
    const capture = registered.find(entry => entry.meta.name === 'conversation.composer.dock').component
    const container = window.document.createElement('div')
    window.document.body.appendChild(container)
    const reactRoot = ReactDOMClient.createRoot(container)
    await act(async () => {
      reactRoot.render(React.createElement(capture, { sessionId: 'session-1', ...options.props }))
    })
    const button = window.document.querySelector('._headerUtilities > .dsh-an-headerBtn')
    return { button, reactRoot, settle }
  }

  const addNote = async text => {
    const popover = window.document.querySelector('.dsh-an-popover')
    const field = popover.querySelector('.dsh-an-input')
    const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set
    await act(async () => {
      setter.call(field, text)
      field.dispatchEvent(new window.Event('input', { bubbles: true }))
    })
    await act(async () => { popover.querySelector('.dsh-an-addBtn').click() })
    await settle(40)
    return popover
  }

  return { window, dom, domain, store, calls, openPanel, addNote, settle, act }
}

test('STORE-019 首次启动把浏览器便笺迁移到宿主并写模式标记', async t => {
  const ctx = await setup({ legacyNote: true })
  t.after(() => ctx.window.close())

  assert.equal(ctx.window.localStorage.getItem(MODE_KEY), 'host', 'a successful switch writes the one-way marker')
  assert.ok(ctx.calls.some(call => call.method === 'POST'), 'the empty host receives the migrated snapshot')
  let snapshot = await ctx.store.snapshot()
  assert.equal(snapshot.data.sessions['session-1'].items[0].text, '旧便笺')

  const { button } = await ctx.openPanel()
  assert.equal(button.querySelector('.dsh-an-headerCount').textContent, '1', 'the badge reads the migrated note')
  await ctx.act(async () => { button.click() })
  const popover = await ctx.addNote('宿主新条目')

  snapshot = await ctx.store.snapshot()
  assert.deepEqual(snapshot.data.sessions['session-1'].items.map(item => item.text), ['宿主新条目', '旧便笺'])
  const legacy = JSON.parse(ctx.window.localStorage.getItem(SESSION_KEY))
  assert.equal(legacy.sessions['session-1'].items.length, 1, 'host mode never writes the legacy browser store')
  assert.match(popover.querySelector('.dsh-an-popFoot').textContent, /DSH 本地文件/)
})

test('STORE-029 迁移上传未完成时保留会话草稿', async t => {
  const migration = Promise.withResolvers()
  const started = Promise.withResolvers()
  const ctx = await setup({
    legacyNote: true,
    beforeStore: (method, body) => {
      if (method !== 'POST' || JSON.parse(body).op !== 'migrate') return
      started.resolve()
      return migration.promise
    },
  })
  t.after(() => { migration.resolve(); ctx.window.close() })
  await started.promise

  const { button } = await ctx.openPanel()
  await ctx.act(async () => { button.click() })
  const before = ctx.window.localStorage.getItem(SESSION_KEY)
  const popover = await ctx.addNote('迁移中的草稿')
  assert.equal(popover.querySelector('.dsh-an-input').value, '迁移中的草稿')
  assert.equal(ctx.window.localStorage.getItem(SESSION_KEY), before)

  await ctx.act(async () => { migration.resolve() })
  assert.equal(ctx.window.localStorage.getItem(MODE_KEY), 'host')
  await ctx.act(async () => { popover.querySelector('.dsh-an-addBtn').click() })
  const snapshot = await ctx.store.snapshot()
  assert.deepEqual(snapshot.data.sessions['session-1'].items.map(item => item.text), ['迁移中的草稿', '旧便笺'])
  assert.equal(ctx.window.localStorage.getItem(SESSION_KEY), before)
})

test('STORE-030 已迁移后的工作区等待宿主快照再初始化', async t => {
  const probe = Promise.withResolvers()
  const workspaceKey = 'dsh.aside-note.workspaces'
  const note = { id: 'host-1', text: '宿主便笺', done: false, createdAt: 2, updatedAt: 2 }
  const workspaces = [{ workspaceId: 'ws-1', title: '工作区', path: '/repo', sessionIds: ['session-1'] }]
  const ctx = await setup({
    legacyNote: true,
    markedHost: true,
    hostSeed: { sessions: { 'session-1': [note] } },
    beforeStore: method => method === 'GET' ? probe.promise : undefined,
    props: { useWorkspaces: select => select({ items: workspaces, phase: 'ready' }) },
  })
  t.after(() => { probe.resolve(); ctx.window.close() })
  const { button } = await ctx.openPanel()
  await ctx.act(async () => { button.click() })
  const popover = await ctx.addNote('探测中的草稿')
  assert.equal(popover.querySelector('.dsh-an-input').value, '探测中的草稿')
  assert.equal(ctx.window.localStorage.getItem(workspaceKey), null)

  await ctx.act(async () => { probe.resolve() })
  assert.deepEqual((await ctx.store.snapshot()).data.workspaces['ws-1'].items.map(item => item.text), ['宿主便笺'])
  await ctx.act(async () => { popover.querySelector('.dsh-an-addBtn').click() })
  assert.deepEqual((await ctx.store.snapshot()).data.workspaces['ws-1'].items.map(item => item.text), ['探测中的草稿', '宿主便笺'])
  assert.equal(ctx.window.localStorage.getItem(workspaceKey), null)
})

test('STORE-020 宿主不可用时不切换并保留浏览器写入', async t => {
  const ctx = await setup({ legacyNote: true, storeDown: true })
  t.after(() => ctx.window.close())
  // The probe retries once with a 250 ms pause before refusing the switch.
  await ctx.settle(400)

  assert.equal(ctx.window.localStorage.getItem(MODE_KEY), null, 'no marker is written when the host refuses')
  const { button } = await ctx.openPanel()
  assert.equal(button.querySelector('.dsh-an-headerCount').textContent, '1')
  await ctx.act(async () => { button.click() })
  await ctx.addNote('仍然本地')

  const legacy = JSON.parse(ctx.window.localStorage.getItem(SESSION_KEY))
  assert.deepEqual(legacy.sessions['session-1'].items.map(item => item.text), ['仍然本地', '旧便笺'])
  const snapshot = await ctx.store.snapshot()
  assert.deepEqual(snapshot.data.sessions, {}, 'no host write happened before the switch')
})

test('STORE-022 已切换后宿主不可用进入错误态且不改写浏览器', async t => {
  const ctx = await setup({ legacyNote: true, markedHost: true, storeDown: true })
  t.after(() => ctx.window.close())
  await ctx.settle(400)

  const { button } = await ctx.openPanel()
  assert.equal(button.querySelector('.dsh-an-headerCount'), null, 'legacy notes are not shown once the host is authoritative')
  await ctx.act(async () => { button.click() })
  const popover = ctx.window.document.querySelector('.dsh-an-popover')
  assert.match(popover.querySelector('.dsh-an-popFoot').textContent, /便笺存储暂不可用/)

  const field = popover.querySelector('.dsh-an-input')
  const setter = Object.getOwnPropertyDescriptor(ctx.window.HTMLTextAreaElement.prototype, 'value').set
  await ctx.act(async () => {
    setter.call(field, '不应写入')
    field.dispatchEvent(new ctx.window.Event('input', { bubbles: true }))
  })
  await ctx.act(async () => { popover.querySelector('.dsh-an-addBtn').click() })
  await ctx.settle(40)

  const legacy = JSON.parse(ctx.window.localStorage.getItem(SESSION_KEY))
  assert.equal(legacy.sessions['session-1'].items.length, 1, 'a failed host mode does not spill into localStorage')
})

test('STORE-021 宿主已有数据时不迁移并保留本地旧副本', async t => {
  const hostNote = { id: 'host-1', text: '宿主便笺', done: false, createdAt: 2, updatedAt: 2 }
  const ctx = await setup({ legacyNote: true, hostSeed: { sessions: { 'session-1': [hostNote] } } })
  t.after(() => ctx.window.close())

  assert.equal(ctx.window.localStorage.getItem(MODE_KEY), 'host')
  assert.equal(ctx.calls.filter(call => call.method === 'POST').length, 0, 'a non-empty host is never migrated into')
  const snapshot = await ctx.store.snapshot()
  assert.deepEqual(snapshot.data.sessions['session-1'].items.map(item => item.text), ['宿主便笺'])

  const { button } = await ctx.openPanel()
  assert.equal(button.querySelector('.dsh-an-headerCount').textContent, '1')
  await ctx.act(async () => { button.click() })
  const popover = ctx.window.document.querySelector('.dsh-an-popover')
  assert.match(popover.textContent, /宿主便笺/)
  const legacy = JSON.parse(ctx.window.localStorage.getItem(SESSION_KEY))
  assert.equal(legacy.sessions['session-1'].items[0].text, '旧便笺', 'the browser copy stays as a recovery source')
})

test('STORE-025 宿主文件打不开时不切换并提示', async t => {
  const ctx = await setup({ legacyNote: true, storeDown: true, storeCode: 'STORE_OPEN_FAILED' })
  t.after(() => ctx.window.close())
  await ctx.settle(400)

  assert.equal(ctx.window.localStorage.getItem(MODE_KEY), null, 'an unreadable host file is not a switch')
  const { button } = await ctx.openPanel()
  assert.equal(button.querySelector('.dsh-an-headerCount').textContent, '1')
  await ctx.act(async () => { button.click() })
  await ctx.addNote('仍然本地')

  const legacy = JSON.parse(ctx.window.localStorage.getItem(SESSION_KEY))
  assert.deepEqual(legacy.sessions['session-1'].items.map(item => item.text), ['仍然本地', '旧便笺'])
  const snapshot = await ctx.store.snapshot()
  assert.deepEqual(snapshot.data.sessions, {}, 'no host write happened')
})

test('STORE-028 设置中可拷贝存储路径', async t => {
  const file = '/Users/me/.dsh/storages/aside_note.json'
  const ctx = await setup({ legacyNote: true, storePath: file })
  t.after(() => ctx.window.close())
  const copied = []
  Object.defineProperty(ctx.window.navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async value => { copied.push(value) } },
  })

  const { button } = await ctx.openPanel()
  await ctx.act(async () => { button.click() })
  const popover = ctx.window.document.querySelector('.dsh-an-popover')
  await ctx.act(async () => { popover.querySelector('.dsh-an-settingsBtn').click() })
  await ctx.settle(60)

  const pathElement = popover.querySelector('.dsh-an-storagePath')
  assert.equal(pathElement.textContent, file)
  const groups = [...popover.querySelectorAll('.dsh-an-settingGroup')]
  const storageGroup = groups.find(group => group.contains(pathElement))
  assert.equal(storageGroup.querySelector('.dsh-an-settingLabel').textContent, '数据存储')
  const aboutGroup = groups.find(group => group.querySelector('.dsh-an-settingLabel')?.textContent === '关于')
  assert.ok(aboutGroup, 'the About group still exists')
  assert.equal(aboutGroup.contains(pathElement), false, 'storage lives in its own group, not in About')
  const privacyGroup = groups.find(group => group.querySelector('.dsh-an-settingLabel')?.textContent === '隐私')
  assert.ok(privacyGroup, 'the Privacy group still exists')
  assert.ok(groups.indexOf(storageGroup) < groups.indexOf(privacyGroup), 'storage sits above Privacy')
  const actions = [...popover.querySelectorAll('.dsh-an-storageAction')]
  assert.equal(actions.length, 2)

  await ctx.act(async () => { actions[0].click() })
  await ctx.settle(10)
  assert.deepEqual(copied, [file])

  await ctx.act(async () => { actions[1].click() })
  await ctx.settle(10)
  assert.ok(ctx.calls.some(call => call.url === REVEAL_PATH && call.method === 'POST'))
})
