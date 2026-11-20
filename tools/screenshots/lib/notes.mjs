// The demo notes: the only source of truth for their copy, state and ages.
//
// bootstrap.mjs types them into the panel and anchors their stamps; capture.mjs
// re-anchors them right before each theme so the light and dark shots agree on
// the reported ages even when the two runs are minutes apart.
//
// Since 1.2.0 notes live in the DSH host file after the one-way switch and only
// stay in the browser `localStorage` records while the host is unavailable. The
// helpers below follow the app's `storage-mode` marker: in host mode they read
// and patch `/dsh-aside-note/store` (the same endpoint the panel uses), and they
// fall back to the two localStorage keys otherwise. `NOTES_KEY` and
// `WORKSPACE_KEY` remain the fallback keys.
export const NOTES_KEY = 'dsh.aside-note' // mirrors SESSION_STORAGE_KEY in src/client/constants.ts
export const WORKSPACE_KEY = 'dsh.aside-note.workspaces' // mirrors WORKSPACE_STORAGE_KEY
export const STORAGE_MODE_KEY = 'dsh.aside-note.storage-mode' // mirrors STORAGE_MODE_KEY
export const HOST_STORE_PATH = '/dsh-aside-note/store' // mirrors HOST_STORE_PATH

export const NOTES = [
  { text: '把发布说明里的截图换成新版面板', done: false, age: 46 * 60000 },
  { text: '核对暗色主题下的对比度', done: false, age: 12 * 60000 },
  { text: '确认 390px 视口下面板不溢出', done: true, age: 2 * 3600000, doneAge: 1 * 3600000 },
  { text: '补一条空状态说明文案', done: true, age: 26 * 3600000, doneAge: 20 * 60000 },
]

const HOST = JSON.stringify(HOST_STORE_PATH)
const MODE = JSON.stringify(STORAGE_MODE_KEY)
const SESSION = JSON.stringify(NOTES_KEY)
const WORKSPACE = JSON.stringify(WORKSPACE_KEY)
const keys = `[${SESSION}, ${WORKSPACE}]`

/**
 * Browser-side helpers shared by the expressions below. The host snapshot is
 * read once; a mutation is a `list.patch` with only the fields we touched.
 */
const hostHelpers = `
    const host = ${HOST}
    const hostMode = localStorage.getItem(${MODE}) === 'host'
    const snapshot = async () => {
      try {
        const res = await fetch(host, { headers: { accept: 'application/json' } })
        if (!res.ok) return null
        const body = await res.json()
        return body && body.ok && body.data ? body.data : null
      } catch { return null }
    }
    const patch = async (kind, listKey, change) => {
      try {
        const res = await fetch(host, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ op: 'list.patch', kind, listKey, ...change }),
        })
        return res.ok
      } catch { return false }
    }
`

/** Browser-side expression that rewrites the stored stamps to the plan's ages. */
export function anchorExpression(notes = NOTES) {
  return `(async () => {
    const plan = ${JSON.stringify(notes)}
    const now = Date.now()
${hostHelpers}
    const stamp = item => {
      const note = plan.find(n => n.text === item.text)
      if (!note) return false
      item.createdAt = now - note.age
      item.updatedAt = now - (note.doneAge ?? note.age)
      if (note.done) item.completedAt = now - (note.doneAge ?? note.age)
      else delete item.completedAt
      return true
    }

    if (hostMode) {
      const data = await snapshot()
      if (!data) return false
      let matched = 0
      for (const [kind, table] of [['session', data.sessions], ['workspace', data.workspaces]]) {
        for (const [listKey, record] of Object.entries(table || {})) {
          const items = Array.isArray(record.items) ? record.items : []
          let changed = false
          for (const item of items) if (stamp(item)) { changed = true; matched += 1 }
          if (!changed) continue
          const ok = await patch(kind, listKey, { order: items.map(item => item.id), upserts: items, deletes: [] })
          if (!ok) return false
        }
      }
      return matched > 0
    }

    let matched = 0
    for (const key of ${keys}) {
      const stored = localStorage.getItem(key)
      if (!stored) continue
      let db
      try { db = JSON.parse(stored) } catch { continue }
      if (!db || typeof db !== 'object') continue
      const records = key === ${SESSION} ? db.sessions : db.workspaces
      for (const record of Object.values(records || {})) {
        for (const item of Array.isArray(record?.items) ? record.items : []) {
          if (stamp(item)) matched += 1
        }
      }
      localStorage.setItem(key, JSON.stringify(db))
    }
    return matched > 0
  })()`
}

/** Snapshot both stores, so the empty-state shot can put them back untouched. */
export function readStoresExpression() {
  return `(async () => {
${hostHelpers}
    if (hostMode) {
      const data = await snapshot()
      return { mode: 'host', data }
    }
    return { mode: 'local', session: localStorage.getItem(${SESSION}), workspace: localStorage.getItem(${WORKSPACE}) }
  })()`
}

/** Drop every note from both stores; seeded workspace records stay merged. */
export function clearStoresExpression() {
  return `(async () => {
${hostHelpers}
    if (hostMode) {
      const data = await snapshot()
      if (!data) return false
      for (const [kind, table] of [['session', data.sessions], ['workspace', data.workspaces]]) {
        for (const [listKey, record] of Object.entries(table || {})) {
          const ids = (Array.isArray(record.items) ? record.items : []).map(item => item.id)
          if (ids.length === 0) continue
          await patch(kind, listKey, { order: [], upserts: [], deletes: ids })
        }
      }
      return true
    }
    for (const key of ${keys}) {
      const stored = localStorage.getItem(key)
      if (!stored) continue
      let db
      try { db = JSON.parse(stored) } catch { continue }
      if (!db || typeof db !== 'object') continue
      const records = key === ${SESSION} ? db.sessions : db.workspaces
      for (const record of Object.values(records || {})) record.items = []
      localStorage.setItem(key, JSON.stringify(db))
    }
    return true
  })()`
}

/** Restore the raw snapshot taken by readStoresExpression. */
export function restoreStoresExpression(saved) {
  return `(async () => {
${hostHelpers}
    const saved = ${JSON.stringify(saved)}
    if (saved && saved.mode === 'host') {
      if (!saved.data) return false
      for (const [kind, table] of [['session', saved.data.sessions], ['workspace', saved.data.workspaces]]) {
        for (const [listKey, record] of Object.entries(table || {})) {
          const items = Array.isArray(record.items) ? record.items : []
          if (items.length === 0) continue
          await patch(kind, listKey, { order: items.map(item => item.id), upserts: items, deletes: [] })
        }
      }
      return true
    }
    const keys = ${keys}
    const values = [saved.session, saved.workspace]
    keys.forEach((key, i) => {
      if (values[i] == null) localStorage.removeItem(key)
      else localStorage.setItem(key, values[i])
    })
    return true
  })()`
}
