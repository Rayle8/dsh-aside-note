import assert from 'node:assert/strict'
import test from 'node:test'
import { createStore } from '../host/store.js'
import { fakeCtx, fakeDomain } from './fake-store.mjs'
import { bootBundle } from './testkit/bundle.mjs'

const STORE_PATH = '/dsh-aside-note/store'
const json = (status, body) => ({ ok: status === 200, status, json: async () => body })

function broadcastBus() {
  const tabs = new Map()
  const messages = []
  return {
    attach(id, window) {
      window.BroadcastChannel = class {
        constructor() { tabs.set(id, this) }
        postMessage(data) { messages.push({ sender: id, data }) }
      }
    },
    async deliver(sender, recipient, app) {
      const index = messages.findIndex(message => message.sender === sender)
      assert.notEqual(index, -1, `expected a notification from ${sender}`)
      const [{ data }] = messages.splice(index, 1)
      await runInTab(app, () => { tabs.get(recipient).onmessage({ data }) })
    },
  }
}

async function runInTab(app, action) {
  globalThis.window = app.window
  globalThis.document = app.document
  await app.act(async () => { await action() })
}

async function openTab(t, id, bus, store, beforeReply = () => {}) {
  const app = await bootBundle(t, {
    prepare: window => bus.attach(id, window),
    fetch: async (path, init) => {
      if (path !== STORE_PATH) return json(404, {})
      const op = init?.method === 'POST' ? JSON.parse(init.body) : null
      const result = op ? await store.apply(op) : await store.snapshot()
      await beforeReply(op)
      return json(200, { ok: true, ...result })
    },
  })
  await app.open()
  return app
}

async function add(app, text) {
  const field = app.popover.querySelector('.dsh-an-input')
  const setter = Object.getOwnPropertyDescriptor(app.window.HTMLTextAreaElement.prototype, 'value').set
  await runInTab(app, () => {
    setter.call(field, text)
    field.dispatchEvent(new app.window.Event('input', { bubbles: true }))
  })
  await runInTab(app, () => { app.popover.querySelector('.dsh-an-addBtn').click() })
}

const visible = app => [...app.popover.querySelectorAll('.dsh-an-text')].map(node => node.textContent)
const persisted = async store => (await store.snapshot()).data.sessions['session-1'].items.map(item => item.text)

test('STORE-031 反序保存回包后标签页仍显示最新清单', async t => {
  const bus = broadcastBus()
  const store = createStore(fakeCtx(fakeDomain()))
  const older = Promise.withResolvers()
  t.after(() => older.resolve())
  const a = await openTab(t, 'A', bus, store, op => op?.op === 'list.patch' ? older.promise : undefined)
  const b = await openTab(t, 'B', bus, store)

  await add(a, 'A 先保存')
  assert.deepEqual(await persisted(store), ['A 先保存'])
  await add(b, 'B 后保存')
  const latest = await persisted(store)
  assert.equal(latest.length, 2)
  await bus.deliver('B', 'A', a)
  await runInTab(a, () => { older.resolve() })
  await bus.deliver('A', 'B', b)

  assert.deepEqual(visible(a), latest)
  assert.deepEqual(visible(b), latest)
})

test('STORE-032 同步读取期间本页写入后重新确认宿主状态', async t => {
  const bus = broadcastBus()
  const store = createStore(fakeCtx(fakeDomain()))
  const staleSnapshot = Promise.withResolvers()
  let aReads = 0
  t.after(() => staleSnapshot.resolve())
  const a = await openTab(t, 'A', bus, store, op => {
    if (!op && ++aReads === 2) return staleSnapshot.promise
  })
  const b = await openTab(t, 'B', bus, store)

  await add(b, '另一页先保存')
  await bus.deliver('B', 'A', a)
  assert.equal(aReads, 2, '远端通知触发宿主读取')
  await add(a, '本页在读取时保存')
  const latest = await persisted(store)
  await runInTab(a, () => { staleSnapshot.resolve() })
  await bus.deliver('A', 'B', b)

  assert.equal(aReads, 3, '已过期的读取必须重做')
  assert.deepEqual(visible(a), latest)
  assert.deepEqual(visible(b), latest)
})
