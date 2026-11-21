/**
 * Host mutations.
 *
 * Notes are written as a diff (`order` + changed `upserts` + removed ids) and
 * the host applies it atomically, so two tabs editing different rows merge
 * instead of replacing each other's whole list. Preferences and forward marks
 * are optimistic — they are presentation state and a failed write only costs a
 * toast, never the user's text.
 */
import { postOp } from './host-client'
import { notifyStoreError } from './events'
import {
  applyHostPrefs,
  applyHostRecord,
  beginPending,
  broadcastPrefs,
  broadcastRecord,
  endPending,
  hostPrefs,
  hostRecord,
  setStorageFailure,
} from './state'

type TableName = 'sessions' | 'workspaces' | 'forwarded'

const chains = new Map<string, Promise<unknown>>()

function serialize<T>(key: string, task: () => Promise<T>): Promise<T> {
  const tail = chains.get(key) ?? Promise.resolve()
  const run = tail.then(task, task)
  chains.set(key, run.then(() => undefined, () => undefined))
  beginPending()
  return run.finally(endPending)
}

function report(error: unknown) {
  const failure = {
    code: typeof (error as any)?.code === 'string' ? (error as any).code : 'STORE_FAILED',
    message: error instanceof Error ? error.message : String(error),
  }
  setStorageFailure({ ...failure, status: (error as any)?.status })
  notifyStoreError(failure)
}

function tableFor(kind: 'workspace' | 'session'): TableName {
  return kind === 'workspace' ? 'workspaces' : 'sessions'
}

function sameJson(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b)
}

function toItems(record: any): any[] {
  return record && Array.isArray(record.items) ? record.items : []
}

/**
 * Persist the next ordered list for one scope.
 * @returns true when the host accepted (or nothing changed)
 */
export async function commitList(kind: 'workspace' | 'session', listKey: string, nextItems: any[]): Promise<boolean> {
  if (!listKey) return false
  const table = tableFor(kind)
  const current = hostRecord(table, listKey)
  const base = toItems(current)
  const baseById = new Map(base.map(item => [item.id, item]))
  const nextById = new Map(nextItems.map(item => [item.id, item]))
  const upserts = nextItems.filter(item => {
    const previous = baseById.get(item.id)
    return previous === undefined || !sameJson(previous, item)
  })
  const deletes = [...baseById.keys()].filter(id => !nextById.has(id))
  const order = nextItems.map(item => item.id)
  if (upserts.length === 0 && deletes.length === 0) return true

  try {
    await serialize(`${table}:${listKey}`, async () => {
      const result = await postOp({ op: 'list.patch', kind, listKey, order, upserts, deletes })
      applyHostRecord(table, listKey, result.record)
      broadcastRecord(table, listKey, result.record, result.rev)
    })
    return true
  } catch (error) {
    // The caller already shows `saveFailed`; record the reason for Settings.
    const failure = {
      code: typeof (error as any)?.code === 'string' ? (error as any).code : 'STORE_FAILED',
      message: error instanceof Error ? error.message : String(error),
    }
    setStorageFailure({ ...failure, status: (error as any)?.status })
    return false
  }
}

/** Fold member sessions into a workspace list once, on the host. */
export async function ensureWorkspace(workspaceId: string, sessionIds: string[]): Promise<boolean> {
  if (!workspaceId) return false
  const current = hostRecord('workspaces', workspaceId)
  const seeded = new Set(Array.isArray(current?.seededSessionIds) ? current.seededSessionIds : [])
  const pendingMembers = (Array.isArray(sessionIds) ? sessionIds : []).filter(id => id && !seeded.has(id))
  if (current && pendingMembers.length === 0) return true
  try {
    await serialize(`workspaces:${workspaceId}`, async () => {
      const result = await postOp({
        op: 'list.ensure', workspaceId, sessionIds: Array.isArray(sessionIds) ? sessionIds : [],
      })
      applyHostRecord('workspaces', workspaceId, result.record)
      broadcastRecord('workspaces', workspaceId, result.record, result.rev)
    })
    return true
  } catch (error) {
    report(error)
    return false
  }
}

/**
 * Toggle one forwarded mark. Optimistic: the check appears immediately and is
 * rolled back only when the write fails and nobody else changed it meanwhile.
 */
export function setForward(listKey: string, itemId: string, on: boolean): boolean {
  if (!listKey || !itemId) return false
  const previous = hostRecord('forwarded', listKey) ?? {}
  if (Boolean(previous[itemId]) === on) return true
  const next: Record<string, true> = { ...previous }
  if (on) next[itemId] = true
  else delete next[itemId]
  applyHostRecord('forwarded', listKey, Object.keys(next).length ? next : undefined)

  void serialize(`forwarded:${listKey}`, async () => {
    try {
      const result = await postOp({ op: 'forward.set', listKey, itemId, on })
      applyHostRecord('forwarded', listKey, result.record)
      broadcastRecord('forwarded', listKey, result.record, result.rev)
    } catch (error) {
      // Roll back only when this tab's optimistic value is still displayed.
      if (sameJson(hostRecord('forwarded', listKey), Object.keys(next).length ? next : undefined)) {
        applyHostRecord('forwarded', listKey, Object.keys(previous).length ? previous : undefined)
      }
      report(error)
    }
  })
  return true
}

/** Merge user preferences on the host; optimistic with the same rollback rule. */
export function setPrefs(patch: Record<string, any>): boolean {
  const previous = hostPrefs()
  const next: Record<string, any> = { ...previous, version: 1 }
  if ('scopeMode' in patch) next.scopeMode = patch.scopeMode
  if ('sendShortcut' in patch) next.sendShortcut = patch.sendShortcut
  if ('forwardPrefix' in patch) {
    if (patch.forwardPrefix === null) delete next.forwardPrefix
    else next.forwardPrefix = String(patch.forwardPrefix).slice(0, 80)
  }
  applyHostPrefs(next)

  void serialize('prefs', async () => {
    try {
      const result = await postOp({ op: 'prefs.set', patch })
      applyHostPrefs(result.prefs)
      broadcastPrefs(result.prefs, result.rev)
    } catch (error) {
      if (sameJson(hostPrefs(), next)) applyHostPrefs(previous)
      report(error)
    }
  })
  return true
}

/** Upload the pre-switch browser store; safe to re-run after an interruption. */
export async function migrate(snapshot: unknown): Promise<{ migrated: number }> {
  const result = await postOp({ op: 'migrate', snapshot, source: 'localStorage' })
  return { migrated: Number.isFinite(result.migrated) ? Number(result.migrated) : 0 }
}
