// The demo notes: the only source of truth for their copy, state and ages.
//
// bootstrap.mjs types them into the panel and anchors their stamps; capture.mjs
// re-anchors them right before each theme so the light and dark shots agree on
// the reported ages even when the two runs are minutes apart.
//
// Since 1.1.0 notes can live in two stores: the per-session record (still
// `dsh.aside-note`) and the workspace record shared by every session of a
// workspace (`dsh.aside-note.workspaces`). The panel opens on the workspace list
// by default, so the demo notes land there; both stores are re-anchored and
// temporarily cleared so the shots stay correct whichever list is on screen.
export const NOTES_KEY = 'dsh.aside-note' // mirrors SESSION_STORAGE_KEY in src/client/constants.ts
export const WORKSPACE_KEY = 'dsh.aside-note.workspaces' // mirrors WORKSPACE_STORAGE_KEY

export const NOTES = [
  { text: '把发布说明里的截图换成新版面板', done: false, age: 46 * 60000 },
  { text: '核对暗色主题下的对比度', done: false, age: 12 * 60000 },
  { text: '确认 390px 视口下面板不溢出', done: true, age: 2 * 3600000, doneAge: 1 * 3600000 },
  { text: '补一条空状态说明文案', done: true, age: 26 * 3600000, doneAge: 20 * 60000 },
]

const keys = `[${JSON.stringify(NOTES_KEY)}, ${JSON.stringify(WORKSPACE_KEY)}]`

/** Browser-side expression that rewrites the stored stamps to the plan's ages. */
export function anchorExpression(notes = NOTES) {
  return `(() => {
    const keys = ${keys}
    const plan = ${JSON.stringify(notes)}
    const now = Date.now()
    let matched = 0
    for (const key of keys) {
      const stored = localStorage.getItem(key)
      if (!stored) continue
      let db
      try { db = JSON.parse(stored) } catch { continue }
      const records = key === ${JSON.stringify(NOTES_KEY)} ? db.sessions : db.workspaces
      for (const record of Object.values(records || {})) {
        for (const item of record.items || []) {
          const note = plan.find(n => n.text === item.text)
          if (!note) continue
          item.createdAt = now - note.age
          item.updatedAt = now - (note.doneAge ?? note.age)
          if (note.done) item.completedAt = now - (note.doneAge ?? note.age)
          matched++
        }
      }
      localStorage.setItem(key, JSON.stringify(db))
    }
    return matched > 0
  })()`
}

/** Snapshot both stores, so the empty-state shot can put them back untouched. */
export function readStoresExpression() {
  return `(() => {
    const keys = ${keys}
    return { session: localStorage.getItem(keys[0]), workspace: localStorage.getItem(keys[1]) }
  })()`
}

/** Drop every note from both stores; seeded workspace records stay merged. */
export function clearStoresExpression() {
  return `(() => {
    const keys = ${keys}
    for (const key of keys) {
      const stored = localStorage.getItem(key)
      if (!stored) continue
      let db
      try { db = JSON.parse(stored) } catch { continue }
      const records = key === ${JSON.stringify(NOTES_KEY)} ? db.sessions : db.workspaces
      for (const record of Object.values(records || {})) record.items = []
      localStorage.setItem(key, JSON.stringify(db))
    }
    return true
  })()`
}

/** Restore the raw snapshot taken by readStoresExpression. */
export function restoreStoresExpression(saved) {
  return `(() => {
    const keys = ${keys}
    const saved = ${JSON.stringify(saved)}
    const values = [saved.session, saved.workspace]
    keys.forEach((key, i) => {
      if (values[i] == null) localStorage.removeItem(key)
      else localStorage.setItem(key, values[i])
    })
    return true
  })()`
}
