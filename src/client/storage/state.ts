/**
 * Browser-side storage state shared by the facade modules.
 *
 * Two sources coexist by design: `localStorage` (the device-local state and
 * the pre-switch fallback) and the in-memory host snapshot. Reads stay
 * synchronous, so the UI keeps its current shape; this module is the single
 * place that answers "which one is authoritative right now".
 */
import { notifyTodoChange } from './events'
import { fetchSnapshot } from './host-client'

export type StorageMode = 'probing' | 'host' | 'local' | 'error'

export interface HostFailure {
  code: string
  message: string
  status?: number
}

/** Durable snapshot served by the host route. */
export interface HostData {
  sessions: Record<string, any>
  workspaces: Record<string, any>
  forwarded: Record<string, any>
  prefs: Record<string, any>
}

let mode: StorageMode = 'probing'
let data: HostData | null = null
let failure: HostFailure | null = null
let pendingWrites = 0
let refreshRequested = false
let refreshing = false

let channel: BroadcastChannel | null = null
let listening = false

/** Current mode; `probing` means boot has not decided yet. */
export function storageMode(): StorageMode {
  return mode
}

/** True while the host is (or must be) the only source: `host` and the error state after it. */
export function hostAuthoritative(): boolean {
  return mode === 'host' || mode === 'error'
}

export function setStorageMode(next: StorageMode) {
  mode = next
  if (next === 'host') void refreshHost()
}

/** The last host failure, for the settings surface. */
export function storageFailure(): HostFailure | null {
  return failure
}

export function setStorageFailure(next: HostFailure | null) {
  failure = next
}

/** Replace the cache with a fresh host snapshot. */
export function hydrateHost(next: HostData) {
  data = next
}

/** Host snapshot, or null before hydration. */
export function hostData(): HostData | null {
  return data
}

/** One host table, or an empty map. */
export function hostTable(name: 'sessions' | 'workspaces' | 'forwarded'): Record<string, any> {
  return data?.[name] ?? {}
}

/** One host record, or undefined. */
export function hostRecord(name: 'sessions' | 'workspaces' | 'forwarded', key: string) {
  if (!key) return undefined
  return hostTable(name)[key]
}

/** Host preferences (user intent that travels with the notes). */
export function hostPrefs(): Record<string, any> {
  return data?.prefs ?? {}
}

/** Merge one record into the cache and wake same-tab readers. */
export function applyHostRecord(name: 'sessions' | 'workspaces' | 'forwarded', key: string, value: any) {
  if (!data || !key) return
  if (value === undefined) delete data[name][key]
  else data[name][key] = value
  notifyTodoChange()
}

/** Replace cached preferences and wake readers. */
export function applyHostPrefs(prefs: Record<string, any>) {
  if (!data) return
  data.prefs = prefs && typeof prefs === 'object' ? prefs : {}
  notifyTodoChange()
}

/** Include the local cache update or rollback in the lifetime of a write. */
export function beginPending() {
  pendingWrites += 1
  if (refreshing) refreshRequested = true
}

export function endPending() {
  pendingWrites -= 1
  void refreshHost()
}

async function refreshHost() {
  if (mode !== 'host' || pendingWrites !== 0 || refreshing || !refreshRequested) return
  refreshing = true
  refreshRequested = false
  try {
    const { data: snapshot } = await fetchSnapshot()
    // A write or notification during GET can make even a successful response stale.
    if (mode === 'host' && !refreshRequested) {
      hydrateHost(snapshot)
      notifyTodoChange()
    }
  } catch {
    // Keep the last usable view. The next notification can try again.
  } finally {
    refreshing = false
    if (refreshRequested) void refreshHost()
  }
}

function ensureChannel(): BroadcastChannel | null {
  if (channel) return channel
  if (typeof BroadcastChannel !== 'function') return null
  try {
    channel = new BroadcastChannel('dsh-aside-note')
  } catch {
    channel = null
  }
  return channel
}

/** Tell other tabs of this browser about one already-durable change. */
export function broadcastRecord(
  name: 'sessions' | 'workspaces' | 'forwarded',
  key: string,
  value: any,
  rev: unknown,
) {
  ensureChannel()?.postMessage({ kind: 'record', name, key, value, rev })
}

export function broadcastPrefs(prefs: Record<string, any>, rev: unknown) {
  ensureChannel()?.postMessage({ kind: 'prefs', prefs, rev })
}

/**
 * Listen for same-browser tab updates once. BroadcastChannel is optional (jsdom
 * and older runtimes), so a missing implementation only loses that nicety.
 */
export function startCrossTabSync() {
  if (listening) return
  const bus = ensureChannel()
  if (!bus) return
  listening = true
  bus.onmessage = event => {
    const message = event?.data
    if (mode === 'local' || (message?.kind !== 'prefs' && message?.kind !== 'record')) return
    // A notification can outlive the response that carried its record. The
    // payload stays compatible with older tabs; new tabs always read the host.
    refreshRequested = true
    void refreshHost()
  }
}
