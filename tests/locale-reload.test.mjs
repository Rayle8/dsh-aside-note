/**
 * The locale service can be replaced without re-applying this plugin: the
 * plugin's Cordis `inject` is only `['slots']`, and `dsh.client.inject` package
 * edges are loading metadata, not apply sequencing. This test boots the built
 * bundle, opens the panel against one service, swaps `ctx.get('locale')` to a
 * fresh service, and proves both halves of the fix follow the replacement:
 *
 * - `makeSay` re-binds, so copy comes from the new service's dictionary bind.
 * - `localeId` reads the live service, so Intl-formatted note ages switch with
 *   the new service's active locale.
 *
 * A note stamped before 1970 is deliberate: it is older than the seven-day
 * cutoff, so its label is formatted with `Intl.DateTimeFormat(localeId)` and
 * does not pass through `say` — making it a clean localeId probe.
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = fs.readFileSync(path.join(root, 'client', 'client.js'), 'utf8')

const option = { month: 'short', day: 'numeric' }
const oldStamp = 1
const formatted = locale => new Intl.DateTimeFormat(locale, option).format(oldStamp)

test('a swapped locale service is followed by makeSay and localeId', async t => {
  const dom = new JSDOM(
    '<!doctype html><html><body><div class="_headerUtilities"></div></body></html>',
    { url: 'https://example.test/', pretendToBeVisual: true, runScripts: 'outside-only' },
  )
  const { window } = dom
  t.after(() => window.close())
  globalThis.window = window
  globalThis.document = window.document
  globalThis.IS_REACT_ACT_ENVIRONMENT = true

  window.HTMLElement.prototype.getBoundingClientRect = () => ({
    width: 320, height: 24, top: 0, left: 0, right: 320, bottom: 24, x: 0, y: 0,
    toJSON: () => ({}),
  })
  window.localStorage.setItem('dsh.aside-note', JSON.stringify({
    version: 1,
    sessions: {
      'session-1': {
        items: [{ id: 'seed', text: 'Alpha', done: false, createdAt: oldStamp, updatedAt: oldStamp }],
      },
    },
  }))
  window.fetch = async () => ({ ok: false, status: 404, json: async () => ({}) })

  const React = await import('react')
  const ReactDOMClient = await import('react-dom/client')
  const { act } = React

  let loaded = null
  window.__ModuleLoader__ = { load: spec => { loaded = spec } }
  window.eval(bundle)
  const moduleTable = {
    react: React,
    'react-dom': await import('react-dom'),
    'react-dom/client': ReactDOMClient,
    '@deepseek-ai/dsh-client-ui-primitives': {},
  }
  const exported = loaded.factory(id => {
    if (!(id in moduleTable)) throw new Error(`module table cannot answer ${id}`)
    return moduleTable[id]
  })

  // Two independent locale services. `bind` answers with a marker in B (and
  // keys in A) so the panel copy names exactly which service answered.
  const service = (active, marker) => {
    const listeners = new Set()
    return {
      bind: () => key => marker ? `${marker}:${key}` : key,
      register: () => {},
      getLocale: () => ({ id: active, revision: 0 }),
      getSnapshot: () => ({ active, revision: 0 }),
      subscribe: listener => {
        listeners.add(listener)
        return () => { listeners.delete(listener) }
      },
      notify: () => { for (const listener of [...listeners]) listener() },
    }
  }
  const before = service('zh', '')
  const after = service('en', 'swapped')
  let current = before

  const disposers = []
  const registered = []
  const ctx = {
    get: name => (name === 'locale' ? current : undefined),
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

  const header = document.querySelector('._headerUtilities > .dsh-an-headerBtn')
  assert.ok(header, 'the header entry must mount for the seeded session')
  await act(async () => { header.click() })
  let popover = document.querySelector('.dsh-an-popover')
  assert.ok(popover, 'the panel must open against the first locale service')

  const meta = () => {
    const row = [...popover.querySelectorAll('.dsh-an-row')]
      .find(node => node.querySelector('.dsh-an-text')?.textContent === 'Alpha')
    assert.ok(row, 'the seeded note must render')
    return row.querySelector('.dsh-an-meta').textContent
  }
  const addField = () => popover.querySelector('.dsh-an-input')

  const zhDate = formatted('zh')
  const enDate = formatted('en')
  assert.notEqual(zhDate, enDate, 'the probe needs two distinct Intl outputs')
  assert.equal(meta(), zhDate, 'the first service formats the note age in Chinese')
  assert.ok(!addField().getAttribute('placeholder').startsWith('swapped:'),
    'the first service answers the panel copy')

  // Close, swap the service behind the same ctx, and reopen. Reopening forces
  // a fresh render with the new closures without relying on the old service's
  // subscription, which is exactly the reload case under test.
  await act(async () => { popover.querySelector('.dsh-an-popClose').click() })
  assert.equal(document.querySelector('.dsh-an-popover'), null, 'the panel must close')
  current = after

  await act(async () => { header.click() })
  popover = document.querySelector('.dsh-an-popover')
  assert.ok(popover, 'the panel must reopen after the service swap')

  // localeId follows the new service: Intl now formats for `en`.
  assert.equal(meta(), enDate, 'the note age follows the new locale service')
  // makeSay follows the new service: copy carries the new service's marker.
  assert.ok(addField().getAttribute('placeholder').startsWith('swapped:'),
    'panel copy is translated by the new locale service')

  await act(async () => { reactRoot.unmount() })
  for (const dispose of disposers) dispose()
  container.remove()
})
