/**
 * Workspace-scoped notes.
 *
 * One list is shared by every session of a workspace. The first time a
 * workspace is seen, notes already written per session are folded in once;
 * `seededSessionIds` records that so a later delete is not undone. After the
 * switch to host storage the fold runs on the host (`list.ensure`), where it is
 * atomic; before the switch it stays in the browser and merges before writing.
 */
import { WORKSPACE_STORAGE_KEY } from '../constants'
import { normalizeItems } from '../domain/items'
import { bootStorage } from './boot'
import { setAsideUnreadable, storage } from './codec'
import { notifyTodoChange } from './events'
import { mergeItems } from './merge'
import { commitList, ensureWorkspace } from './ops'
import { hostAuthoritative, hostRecord, hostTable, storageMode } from './state'
import { readSessionStore } from './session'

const text = value => (value ? String(value) : '')
const bucket = value => (value && typeof value === 'object' && !Array.isArray(value) ? value : {})

function seededOf(record) {
  const raw = record && record.seededSessionIds
  if (!Array.isArray(raw)) return []
  const seen = new Set()
  const next = []
  for (const value of raw) {
    const id = text(value)
    if (!id || seen.has(id)) continue
    seen.add(id)
    next.push(id)
  }
  return next
}

/** Empty workspace-note store. */
export function emptyWorkspaceStore() {
  return { version: 1, workspaces: {} as Record<string, any> }
}

/**
 * Read the browser workspace store; corrupt or unavailable reads as empty.
 * An unreadable payload is parked under `<key>.corrupt` before any write.
 */
function readLocalStore() {
  const ls = storage()
  if (!ls) return emptyWorkspaceStore()
  let raw
  try {
    raw = ls.getItem(WORKSPACE_STORAGE_KEY)
  } catch {
    return emptyWorkspaceStore()
  }
  if (!raw) return emptyWorkspaceStore()
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    setAsideUnreadable(WORKSPACE_STORAGE_KEY, raw)
    return emptyWorkspaceStore()
  }
  const workspaces = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed.workspaces : undefined
  const broken = !parsed || typeof parsed !== 'object' || Array.isArray(parsed)
    || (workspaces !== undefined && (!workspaces || typeof workspaces !== 'object' || Array.isArray(workspaces)))
  if (broken) {
    setAsideUnreadable(WORKSPACE_STORAGE_KEY, raw)
    return emptyWorkspaceStore()
  }
  return { version: 1, workspaces: bucket(workspaces) }
}

/** Read the workspace-note store from the authoritative medium. */
export function readWorkspaceStore() {
  if (hostAuthoritative()) return { version: 1, workspaces: { ...hostTable('workspaces') } }
  return readLocalStore()
}

/** Persist the whole browser workspace store. */
export function writeWorkspaceStore(store) {
  const ls = storage()
  if (!ls) return false
  try {
    ls.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify({
      version: 1,
      workspaces: bucket(store && store.workspaces),
    }))
    notifyTodoChange()
    return true
  } catch {
    return false
  }
}

/** One workspace's memo record. */
export function readWorkspaceRecord(workspaceId) {
  const key = text(workspaceId)
  if (!key) return { items: [], updatedAt: 0, seededSessionIds: [] }
  if (hostAuthoritative()) {
    const record = hostRecord('workspaces', key)
    return {
      items: normalizeItems(record && record.items),
      updatedAt: record && Number.isFinite(record.updatedAt) ? record.updatedAt : 0,
      seededSessionIds: seededOf(record),
    }
  }
  const record = readLocalStore().workspaces[key]
  return {
    items: normalizeItems(record && record.items),
    updatedAt: record && Number.isFinite(record.updatedAt) ? record.updatedAt : 0,
    seededSessionIds: seededOf(record),
  }
}

/**
 * Persist one workspace's memo record.
 *
 * Host mode sends only the changed notes; the host merges them atomically.
 * Local mode reads the latest stored record and merges by id, keeping this
 * tab's deletions (`base`) from being resurrected by a concurrent writer.
 *
 * @returns resolution with whether the write was accepted/durable
 */
export async function writeWorkspaceRecord(workspaceId, record, base = null) {
  const key = text(workspaceId)
  if (!key) return false
  const mode = storageMode()
  if (mode === 'probing' || mode === 'error') return false
  if (mode === 'host') {
    return commitList('workspace', key, normalizeItems(record && record.items))
  }
  const store = readLocalStore()
  const previous = store.workspaces[key]
  const seededSource = Array.isArray(record.seededSessionIds) ? record : previous
  store.workspaces[key] = {
    workspaceId: key,
    updatedAt: Math.max(
      record.updatedAt || 0,
      previous && Number.isFinite(previous.updatedAt) ? previous.updatedAt : 0,
    ) || Date.now(),
    items: mergeItems(normalizeItems(previous && previous.items), normalizeItems(record.items), base),
    seededSessionIds: seededOf(seededSource),
  }
  return writeWorkspaceStore(store)
}

/**
 * Fold the member sessions' existing notes into the workspace list once.
 * @returns resolution with whether the store changed / was accepted
 */
export async function ensureWorkspaceRecord(workspaceId, sessionIds) {
  const key = text(workspaceId)
  if (!key) return false
  // Seeding has no user draft or captured note data. It can wait for the
  // authoritative store and read the member lists when that store is ready.
  if (storageMode() === 'probing') await bootStorage()
  const mode = storageMode()
  if (mode === 'probing' || mode === 'error') return false
  if (mode === 'host') return ensureWorkspace(key, Array.isArray(sessionIds) ? sessionIds : [])

  const workspaceStore = readLocalStore()
  const previous = workspaceStore.workspaces[key]
  const seeded = new Set(seededOf(previous))
  const items = normalizeItems(previous && previous.items)
  const seen = new Set(items.map(item => item.id))
  let changed = !previous

  if (!changed && Array.isArray(sessionIds)) {
    for (const value of sessionIds) {
      const sessionId = text(value)
      if (!sessionId) continue
      if (!seeded.has(sessionId)) {
        changed = true
        break
      }
    }
  }

  if (!changed) return false

  const sessionStore = readSessionStore()
  for (const value of Array.isArray(sessionIds) ? sessionIds : []) {
    const sessionId = text(value)
    if (!sessionId || seeded.has(sessionId)) continue
    seeded.add(sessionId)
    changed = true
    const sessionRecord = sessionStore.sessions[sessionId]
    for (const item of normalizeItems(sessionRecord && sessionRecord.items)) {
      if (seen.has(item.id)) continue
      seen.add(item.id)
      items.push(item)
    }
  }

  return writeWorkspaceRecord(key, {
    items,
    updatedAt: previous && Number.isFinite(previous.updatedAt) ? previous.updatedAt : Date.now(),
    seededSessionIds: [...seeded],
  })
}
