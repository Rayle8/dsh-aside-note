/**
 * Session-scoped notes.
 *
 * Two media, one shape: while this browser is still on `localStorage` the
 * record lives under `SESSION_STORAGE_KEY`; after the one-way switch the same
 * record lives in the host snapshot's `sessions` table and writes go through
 * the host route. The workspace key is separate, so existing per-session data
 * is never rewritten into a new schema.
 */
import { SESSION_STORAGE_KEY } from '../constants'
import { normalizeItems } from '../domain/items'
import { setAsideUnreadable, storage } from './codec'
import { notifyTodoChange } from './events'
import { mergeItems } from './merge'
import { commitList } from './ops'
import { hostAuthoritative, hostRecord, hostTable, storageMode } from './state'

/** Empty note store. */
export function emptySessionStore() {
  return { version: 1, sessions: {} as Record<string, any> }
}

const bucket = value => (value && typeof value === 'object' && !Array.isArray(value) ? value : {})

/**
 * Read the browser store; corrupt or unavailable reads as empty.
 * An unreadable payload is parked under `<key>.corrupt` first, so the next
 * write cannot destroy the only copy of a user's notes.
 */
function readLocalStore() {
  const ls = storage()
  if (!ls) return emptySessionStore()
  let raw
  try {
    raw = ls.getItem(SESSION_STORAGE_KEY)
  } catch {
    return emptySessionStore()
  }
  if (!raw) return emptySessionStore()
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    setAsideUnreadable(SESSION_STORAGE_KEY, raw)
    return emptySessionStore()
  }
  const sessions = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed.sessions : undefined
  const broken = !parsed || typeof parsed !== 'object' || Array.isArray(parsed)
    || (sessions !== undefined && (!sessions || typeof sessions !== 'object' || Array.isArray(sessions)))
  if (broken) {
    setAsideUnreadable(SESSION_STORAGE_KEY, raw)
    return emptySessionStore()
  }
  return { version: 1, sessions: bucket(sessions) }
}

/** Read the whole note store from whichever medium is authoritative now. */
export function readSessionStore() {
  if (hostAuthoritative()) return { version: 1, sessions: { ...hostTable('sessions') } }
  return readLocalStore()
}

/** Persist the whole browser store; the single writer for the legacy key. */
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
  if (hostAuthoritative()) {
    const record = hostRecord('sessions', key)
    return {
      items: normalizeItems(record && record.items),
      updatedAt: record && Number.isFinite(record.updatedAt) ? record.updatedAt : 0,
    }
  }
  const record = readLocalStore().sessions[key]
  return {
    items: normalizeItems(record && record.items),
    updatedAt: record && Number.isFinite(record.updatedAt) ? record.updatedAt : 0,
  }
}

/**
 * Persist one session's memo record.
 *
 * Host mode sends only the changed notes; the host applies them atomically to
 * its latest record. Local mode reads the latest stored record first and merges
 * by id, so a note another tab added is not overwritten; `base` is the list this
 * tab rendered, and ids missing from `record.items` are this tab's deletions.
 *
 * @returns resolution with whether the write was accepted/durable
 */
export async function writeSessionRecord(sessionId, record, base = null) {
  const key = sessionId ? String(sessionId) : ''
  if (!key) return false
  const mode = storageMode()
  if (mode === 'probing' || mode === 'error') return false
  if (mode === 'host') {
    return commitList('session', key, normalizeItems(record && record.items))
  }
  const store = readLocalStore()
  const previous = store.sessions[key]
  store.sessions[key] = {
    sessionId: key,
    updatedAt: Math.max(
      record.updatedAt || 0,
      previous && Number.isFinite(previous.updatedAt) ? previous.updatedAt : 0,
    ) || Date.now(),
    items: mergeItems(normalizeItems(previous && previous.items), normalizeItems(record.items), base),
  }
  return writeSessionStore(store)
}
