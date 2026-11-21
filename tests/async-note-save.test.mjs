import assert from 'node:assert/strict'
import test from 'node:test'
import { createStore } from '../host/store.js'
import { fakeCtx, fakeDomain } from './fake-store.mjs'
import { bootBundle } from './testkit/bundle.mjs'

const STORE_PATH = '/dsh-aside-note/store'
const json = (status, body) => ({ ok: status === 200, status, json: async () => body })

function note(id, text, done = false) {
  return { id, text, done, createdAt: 1, updatedAt: 1, ...(done ? { completedAt: 1 } : {}) }
}

function addItem(store, kind, listKey, item) {
  return store.apply({ op: 'list.patch', kind, listKey, upserts: [item], order: [item.id] })
}

async function openHostPanel(t, store, options) {
  const app = await bootBundle(t, {
    props: options?.props,
    fetch: async (path, init) => {
      if (path !== STORE_PATH) return json(404, {})
      if (init?.method !== 'POST') return json(200, { ok: true, ...await store.snapshot() })
      const op = JSON.parse(init.body)
      const result = await store.apply(op)
      await options?.beforeResponse?.(op)
      return json(200, { ok: true, ...result })
    },
  })
  await app.open()
  return app
}

async function typeDraft(app, text) {
  const field = app.popover.querySelector('.dsh-an-input')
  const setter = Object.getOwnPropertyDescriptor(app.window.HTMLTextAreaElement.prototype, 'value').set
  await app.act(async () => {
    setter.call(field, text)
    field.dispatchEvent(new app.window.Event('input', { bubbles: true }))
  })
  return field
}

test('SCOPE-014 切换范围后排队清空仍只影响原清单', async t => {
  const firstWrite = Promise.withResolvers()
  const release = Promise.withResolvers()
  t.after(() => release.resolve())
  const store = createStore(fakeCtx(fakeDomain()))
  await store.apply({ op: 'list.ensure', workspaceId: 'ws-1', sessionIds: ['session-1'] })
  await addItem(store, 'workspace', 'ws-1', note('work-done', '工作区已完成', true))
  await addItem(store, 'session', 'session-1', note('session-done', '会话已完成', true))
  const workspace = { workspaceId: 'ws-1', path: '/repo', title: '工作区', sessionIds: ['session-1'] }
  const app = await openHostPanel(t, store, {
    props: { useWorkspaces: select => select({ items: [workspace], phase: 'ready' }) },
    beforeResponse: op => {
      if (op.op !== 'list.patch' || op.kind !== 'workspace' || !op.upserts?.some(item => item.text === '第一笔写入')) return
      firstWrite.resolve()
      return release.promise
    },
  })

  await typeDraft(app, '第一笔写入')
  await app.act(async () => { app.popover.querySelector('.dsh-an-addBtn').click() })
  await firstWrite.promise
  await app.act(async () => { app.popover.querySelector('.dsh-an-doneHead .dsh-an-doneToggle').click() })
  await app.act(async () => { app.popover.querySelector('.dsh-an-clear').click() })
  await app.act(async () => { app.popover.querySelector('.dsh-an-miniDanger').click() })
  await app.act(async () => { app.popover.querySelector('[data-scope-mode="session"]').click() })
  await app.act(async () => { release.resolve() })

  const { data } = await store.snapshot()
  assert.deepEqual(data.workspaces['ws-1'].items.map(item => item.text), ['第一笔写入'])
  assert.deepEqual(data.sessions['session-1'].items.map(item => item.text), ['会话已完成'])
  assert.equal(app.button.querySelector('.dsh-an-headerCount'), null, '当前会话没有未完成便笺')
  await app.dispose()
})

test('NOTE-010 保存回包保留下一份草稿且不重复提交', async t => {
  const firstWrite = Promise.withResolvers()
  const release = Promise.withResolvers()
  t.after(() => release.resolve())
  const store = createStore(fakeCtx(fakeDomain()))
  const app = await openHostPanel(t, store, {
    beforeResponse: op => {
      if (op.op !== 'list.patch' || !op.upserts?.some(item => item.text === '第一条草稿')) return
      firstWrite.resolve()
      return release.promise
    },
  })
  const field = await typeDraft(app, '第一条草稿')
  const submit = app.popover.querySelector('.dsh-an-addBtn')
  await app.act(async () => { submit.click() })
  await firstWrite.promise
  await app.act(async () => {
    submit.click()
    field.dispatchEvent(new app.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
  })
  await typeDraft(app, '下一份草稿')
  await app.act(async () => { release.resolve() })

  const draftKey = 'dsh.aside-note.drafts'
  assert.equal(field.value, '下一份草稿')
  assert.equal(JSON.parse(app.window.localStorage.getItem(draftKey)).sessions['session-1'].add, '下一份草稿')
  const savedTexts = async () => (await store.snapshot()).data.sessions['session-1'].items.map(item => item.text)
  assert.deepEqual(await savedTexts(), ['第一条草稿'])
  await app.act(async () => { submit.click() })
  assert.deepEqual(await savedTexts(), ['下一份草稿', '第一条草稿'])
  assert.equal(field.value, '')
  assert.equal(JSON.parse(app.window.localStorage.getItem(draftKey)).sessions['session-1'], undefined)
  await app.dispose()
})
