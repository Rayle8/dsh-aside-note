/**
 * Unsaved add/edit drafts, so closing the panel never loses text.
 *
 * Records are keyed by draft scope, not by conversation: inside a workspace
 * every member session shares one buffer (`ws:<workspaceId>`), so switching
 * conversations or the workspace/session scope never strands half-typed text.
 * A session outside a workspace keeps its own key. Saving still writes the
 * list selected at that moment. The map field stays `sessions` so the existing
 * store keeps its shape.
 */
import { DRAFT_STORAGE_KEY, MAX_TEXT } from '../constants'
import { storage } from './codec'

const keyOf = value => (value ? String(value) : '')

/** Empty unsaved-draft store. */
export function emptyDraftStore() {
  return { version: 1, sessions: {} }
}

/** Read the unsaved add/edit drafts; corrupt or unavailable reads as empty. */
export function readDraftStore() {
  const ls = storage()
  if (!ls) return emptyDraftStore()
  try {
    const raw = ls.getItem(DRAFT_STORAGE_KEY)
    if (!raw) return emptyDraftStore()
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return emptyDraftStore()
    const sessions = parsed.sessions
    if (!sessions || typeof sessions !== 'object' || Array.isArray(sessions)) return emptyDraftStore()
    return { version: 1, sessions }
  } catch {
    return emptyDraftStore()
  }
}

export function writeDraftStore(store) {
  const ls = storage()
  if (!ls) return
  try {
    ls.setItem(DRAFT_STORAGE_KEY, JSON.stringify(store))
  } catch {
    /* storage is best effort */
  }
}

/** Unsaved add/edit drafts of one scope (a workspace or a lone session). */
export function readScopeDrafts(key) {
  const id = keyOf(key)
  const record = id ? readDraftStore().sessions[id] : null
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    return { add: '', edits: {} }
  }
  return {
    add: typeof record.add === 'string' ? record.add : '',
    edits: record.edits && typeof record.edits === 'object' && !Array.isArray(record.edits)
      ? record.edits
      : {},
  }
}

export function pruneDraftScope(store, key) {
  const record = store.sessions[key]
  if (!record) return
  const hasAdd = typeof record.add === 'string' && record.add.length > 0
  const hasEdits = record.edits && typeof record.edits === 'object' && Object.keys(record.edits).length > 0
  if (!hasAdd && !hasEdits) delete store.sessions[key]
}

export function saveAddDraft(key, text) {
  const id = keyOf(key)
  if (!id) return
  const store = readDraftStore()
  const record = store.sessions[id] || {}
  const value = String(text || '').slice(0, MAX_TEXT)
  if (value) record.add = value
  else delete record.add
  record.edits = record.edits && typeof record.edits === 'object' ? record.edits : {}
  store.sessions[id] = record
  pruneDraftScope(store, id)
  writeDraftStore(store)
}

export function clearAddDraft(key) {
  saveAddDraft(key, '')
}

export function readEditDraft(key, itemId) {
  const id = keyOf(key)
  if (!id || !itemId) return null
  const edits = readScopeDrafts(id).edits
  return typeof edits[itemId] === 'string' ? edits[itemId] : null
}

export function saveEditDraft(key, itemId, text) {
  const id = keyOf(key)
  if (!id || !itemId) return
  const store = readDraftStore()
  const record = store.sessions[id] || {}
  record.edits = record.edits && typeof record.edits === 'object' ? record.edits : {}
  record.edits[itemId] = String(text || '').slice(0, MAX_TEXT)
  store.sessions[id] = record
  writeDraftStore(store)
}

export function clearEditDraft(key, itemId) {
  const id = keyOf(key)
  if (!id || !itemId) return
  const store = readDraftStore()
  const record = store.sessions[id]
  if (!record || !record.edits || typeof record.edits !== 'object') return
  delete record.edits[itemId]
  pruneDraftScope(store, id)
  writeDraftStore(store)
}

/**
 * Move a conversation's pre-workspace draft under the shared workspace key.
 *
 * Runs once per workspace: the draft the user is looking at becomes the shared
 * buffer, and the workspace members' per-session copies are retired so that
 * clearing the buffer cannot resurrect them. A no-op outside a workspace, once
 * the shared key exists, or when the legacy record holds no text.
 */
export function ensureDraftScope(key, sessionId, sessionIds) {
  const target = keyOf(key)
  const source = keyOf(sessionId)
  if (!target || !source || target === source) return false
  const members = (Array.isArray(sessionIds) ? sessionIds : []).map(keyOf).filter(Boolean)
  const store = readDraftStore()
  if (store.sessions[target]) return false
  const legacy = store.sessions[source]
  if (!legacy || typeof legacy !== 'object' || Array.isArray(legacy)) return false

  const add = typeof legacy.add === 'string' ? legacy.add.slice(0, MAX_TEXT) : ''
  const edits = {}
  const legacyEdits = legacy.edits && typeof legacy.edits === 'object' && !Array.isArray(legacy.edits)
    ? legacy.edits
    : {}
  for (const [itemId, text] of Object.entries(legacyEdits)) {
    if (!itemId || typeof text !== 'string') continue
    edits[itemId] = text.slice(0, MAX_TEXT)
  }
  const editCount = Object.keys(edits).length
  if (!add && !editCount) return false

  store.sessions[target] = {
    ...(add ? { add } : {}),
    ...(editCount ? { edits } : {}),
  }
  for (const member of members) delete store.sessions[member]
  // A stale workspace binding may not list the source; retire it regardless so
  // it cannot seed the shared key a second time.
  delete store.sessions[source]
  writeDraftStore(store)
  return true
}
