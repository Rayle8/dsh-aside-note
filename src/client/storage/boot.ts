/**
 * The one-time decision: switch this browser's notes to host storage or stay
 * on localStorage.
 *
 * Rules (docs/design/host-storage-migration.md §7.1/§7.5):
 * - probe before deciding; an unavailable host means "don't switch", keep
 *   working locally, notify, and retry on the next load;
 * - migrate only after a successful open, and write the one-way marker only
 *   after the data is durable;
 * - after the switch the host is authoritative: a later outage is an error
 *   state, never a silent fallback that would fork the data.
 */
import { fetchSnapshot } from './host-client'
import { migrate } from './ops'
import {
  hasLegacyData,
  hostModeMarked,
  legacyNoteCount,
  markHostMode,
  readLegacySnapshot,
  rememberStorageNotice,
  shouldNoticeStorage,
} from './legacy'
import { notifyStoreError, notifyStoreNotice, notifyStoreReady } from './events'
import {
  hydrateHost,
  setStorageFailure,
  setStorageMode,
  startCrossTabSync,
  storageMode,
  type HostFailure,
  type StorageMode,
} from './state'

let booting: Promise<StorageMode> | null = null

function failureOf(error: unknown): HostFailure {
  const code = typeof (error as any)?.code === 'string' ? (error as any).code : 'STORE_FAILED'
  return {
    code,
    message: error instanceof Error ? error.message : String(error),
    status: (error as any)?.status,
  }
}

function refuse(failure: HostFailure): StorageMode {
  setStorageFailure(failure)
  setStorageMode('local')
  notifyStoreReady()
  if (shouldNoticeStorage(failure.code)) {
    rememberStorageNotice(failure.code)
    notifyStoreNotice({ kind: 'notSwitched', code: failure.code })
  }
  return 'local'
}

async function runBoot(): Promise<StorageMode> {
  startCrossTabSync()
  const marked = hostModeMarked()

  // Already switched: the host is the only truth. No localStorage fallback.
  if (marked) {
    try {
      const snapshot = await fetchSnapshot()
      hydrateHost(snapshot.data)
      setStorageFailure(null)
      setStorageMode('host')
      notifyStoreReady()
      return 'host'
    } catch (error) {
      const failure = failureOf(error)
      setStorageFailure(failure)
      setStorageMode('error')
      notifyStoreReady()
      if (shouldNoticeStorage(failure.code)) {
        rememberStorageNotice(failure.code)
        notifyStoreError({ code: failure.code, message: failure.message })
      }
      return 'error'
    }
  }

  let snapshot
  try {
    snapshot = await fetchSnapshot()
  } catch (error) {
    return refuse(failureOf(error))
  }

  // Read the browser store only after the probe: anything typed while the host
  // was being checked must be part of the migration.
  const legacy = readLegacySnapshot()
  const incomplete = snapshot.data.prefs?.migration?.complete === false
  let migrated = 0

  try {
    if (incomplete) {
      // A previous attempt stopped midway; re-sending is idempotent.
      if (hasLegacyData(legacy)) {
        const result = await migrate(legacy)
        migrated = result.migrated
        snapshot = await fetchSnapshot()
      }
    } else if (snapshot.empty) {
      if (hasLegacyData(legacy)) {
        const result = await migrate(legacy)
        migrated = result.migrated
        snapshot = await fetchSnapshot()
        const count = legacyNoteCount(legacy) || migrated
        if (count > 0) notifyStoreNotice({ kind: 'migrated', count })
      }
    } else if (legacyNoteCount(legacy) > 0) {
      notifyStoreNotice({ kind: 'keptLocal' })
    }
  } catch (error) {
    return refuse(failureOf(error))
  }

  hydrateHost(snapshot.data)
  markHostMode()
  setStorageFailure(null)
  setStorageMode('host')
  notifyStoreReady()
  return 'host'
}

/** Decide once per page load; later callers share the same promise. */
export function bootStorage(): Promise<StorageMode> {
  if (!booting) booting = runBoot().catch(error => refuse(failureOf(error)))
  return booting
}

/** Force a new probe (settings retry button). */
export function retryStorage(): Promise<StorageMode> {
  booting = runBoot().catch(error => refuse(failureOf(error)))
  return booting
}

/** Current mode without waiting. */
export function currentStorageMode(): StorageMode {
  return storageMode()
}
