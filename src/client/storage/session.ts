/**
 * Session-scoped notes in one localStorage record.
 *
 * The shape stays at v1: workspace notes now live under
 * `WORKSPACE_STORAGE_KEY`, so the session key existing users already have is
 * never rewritten into a new schema.
 */
import { SESSION_STORAGE_KEY } from '../constants'
import { normalizeItems } from '../domain/items'
import { storage } from './codec'
import { notifyTodoChange } from './events'

/** Empty note store. */
export function emptySessionStore() {
  return { version: 1, sessions: {} }
}

const bucket = value => (value && typeof value === 'object' && !Array.isArray(value) ? value : {})

/** Read the whole note store; corrupt or unavailable reads as empty. */
export function readSessionStore() {
  const ls = storage()
  if (!ls) return emptySessionStore()
  try {
    const raw = ls.getItem(SESSION_STORAGE_KEY)
    if (!raw) return emptySessionStore()
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return emptySessionStore()
    return { version: 1, sessions: bucket(parsed.sessions) }
  } catch {
    return emptySessionStore()
  }
}

/** Persist the whole session store; the single writer for this key. */
export function writeSessionStore(store) {
  const ls = storage()
  if (!ls) return false
  try {
    ls.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      version: 1,
      sessions: bucket(store && store.sessions),
    }))
    notifyTodoChange()
    return true
  } catch {
    return false
  }
}

/** Read one session's memo record. */
export function readSessionRecord(sessionId) {
  const key = sessionId ? String(sessionId) : ''
  if (!key) return { items: [], updatedAt: 0 }
  const record = readSessionStore().sessions[key]
  return {
    items: normalizeItems(record && record.items),
    updatedAt: record && Number.isFinite(record.updatedAt) ? record.updatedAt : 0,
  }
}

/** Persist one session's memo record. */
export function writeSessionRecord(sessionId, record) {
  const key = sessionId ? String(sessionId) : ''
  if (!key) return false
  const store = readSessionStore()
  store.sessions[key] = {
    sessionId: key,
    updatedAt: record.updatedAt || Date.now(),
    items: normalizeItems(record.items),
  }
  return writeSessionStore(store)
}
