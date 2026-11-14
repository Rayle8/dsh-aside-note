/**
 * Update centre state for the settings card.
 *
 * Three things are allowed to be independent here: the published version check
 * (auto on open, manual on demand), the release notes behind that version
 * (loaded as soon as an update is offered), and the in-app update itself
 * (one host request that installs over the running copy). Keeping them separate
 * means a missing release body cannot take the version check down with it.
 *
 * The panel never runs a package manager itself. When the host has no update
 * route, the card falls back to the exact command the host reports, or pins the
 * offered version when the failure has no command of its own.
 */
import React from 'react'
import { PLUGIN_REPO_URL, PLUGIN_VERSION } from '../constants'
import {
  fetchLatestVersion,
  fetchReleaseHistory,
  isNewerVersion,
  resetUpdateChecks,
} from '../update/latest'
import { updateNotesForLocale } from '../update/releaseNotes'
import type { ReleaseNoteGroup } from '../update/releaseNotes'
import { applyHostUpdate } from '../update/host'
import { isPublishedChannel } from '../update/latest'
import { copyText } from '../domain/clipboard'
import { reportEvent } from '../rum'

export type CheckStatus = 'idle' | 'checking' | 'current' | 'available' | 'error'
export type NotesStatus = 'idle' | 'loading' | 'ready' | 'error'
export type RunPhase = 'idle' | 'starting' | 'running' | 'done' | 'error'

export interface UpdateCheckState {
  status: CheckStatus
  /**
   * The version being offered as an update; null when the running build is
   * current, including while a check is in flight and after one fails.
   */
  latestVersion: string | null
  checkedAt: number | null
}

export interface NotesEntry {
  version: string
  url: string
  groups: ReleaseNoteGroup[]
}

export interface NotesState {
  status: NotesStatus
  /** One entry per release between the running build and the published one. */
  entries: NotesEntry[]
  /** True when older releases were left out of the capped list. */
  truncated: boolean
}

export interface UpdateRunState {
  phase: RunPhase
  failureCode: string | null
  message: string | null
  retryable: boolean
  refreshRequired: boolean
  restartRequired: boolean
  installedVersion: string | null
}

const CHECK_IDLE: UpdateCheckState = { status: 'idle', latestVersion: null, checkedAt: null }
const NOTES_IDLE: NotesState = { status: 'idle', entries: [], truncated: false }
const RUN_IDLE: UpdateRunState = {
  phase: 'idle',
  failureCode: null,
  message: null,
  retryable: false,
  refreshRequired: false,
  restartRequired: false,
  installedVersion: null,
}

/**
 * A manual check stays on screen for at least this long. A fast registry answer
 * would otherwise flip the button back in a few milliseconds, which reads as
 * "did that do anything?" and invites repeat clicks.
 */
const MIN_CHECK_MS = 3000

const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

function terminalRun(phase: RunPhase, patch: Partial<UpdateRunState> = {}): UpdateRunState {
  return { ...RUN_IDLE, phase, ...patch }
}

export function useUpdateCenter(localeId: string) {
  const [check, setCheck] = React.useState<UpdateCheckState>(CHECK_IDLE)
  const [notes, setNotes] = React.useState<NotesState>(NOTES_IDLE)
  const [expandedVersions, setExpandedVersions] = React.useState<Record<string, boolean>>({})
  const [run, setRun] = React.useState<UpdateRunState>(RUN_IDLE)

  const disposed = React.useRef(false)
  const runRef = React.useRef<UpdateRunState>(RUN_IDLE)
  runRef.current = run
  /** The offered version, readable from callbacks without re-creating them. */
  const latestRef = React.useRef<string | null>(null)
  latestRef.current = check.latestVersion
  /** Set before the first await so the same panel cannot start two operations. */
  const starting = React.useRef(false)

  React.useEffect(() => {
    disposed.current = false
    return () => {
      disposed.current = true
    }
  }, [])

  // `latestVersion` is the version being *offered*, never the one already
  // running: an up-to-date check stores null. That keeps the card and the gear
  // dot mounted only while a real update exists — including across a manual
  // re-check and a failed one — instead of briefly announcing the running
  // version as new when the previous check had ended up to date.
  const latestVersion = check.latestVersion

  // Quiet check on open: keeps the gear dot meaningful without a click. A local
  // dev build (`2.1.0-dev`) never nags, but a build from a published channel
  // (`1.1.2-beta.1`) is one a tester installed on purpose and must be checked.
  React.useEffect(() => {
    if (PLUGIN_VERSION.includes('-') && !isPublishedChannel(PLUGIN_VERSION)) return undefined
    let active = true
    fetchLatestVersion().then(version => {
      if (!active) return
      if (version === null) {
        reportEvent('update_checked', { ext1: 'auto', ext2: 'error' })
        return
      }
      const newer = isNewerVersion(version, PLUGIN_VERSION)
      reportEvent('update_checked', { ext1: 'auto', ext2: newer ? 'available' : 'current' })
      if (newer) {
        setCheck({ status: 'available', latestVersion: version, checkedAt: Date.now() })
      } else {
        setCheck({ status: 'current', latestVersion: null, checkedAt: Date.now() })
      }
    })
    return () => {
      active = false
    }
  }, [])

  const checkNow = React.useCallback(async () => {
    if (check.status === 'checking') return
    // A manual check is an explicit request to look again: drop the hourly cache.
    resetUpdateChecks()
    const startedAt = Date.now()
    const previousOffer = check.latestVersion
    setCheck(previous => ({ ...previous, status: 'checking' }))
    // A new check supersedes a finished or failed attempt, so the card cannot
    // keep showing a failure that belongs to the previous version.
    setRun(RUN_IDLE)
    const version = await fetchLatestVersion()
    // Keep the checking state visible long enough to be noticed, even when the
    // registry answers immediately.
    const remaining = MIN_CHECK_MS - (Date.now() - startedAt)
    if (remaining > 0) await sleep(remaining)
    if (disposed.current) return
    if (version === null) {
      // Keep the version already on offer; when the build was up to date, the
      // failure stays in the button and no card is conjured up.
      reportEvent('update_checked', { ext1: 'manual', ext2: 'error' })
      setCheck({ status: 'error', latestVersion: previousOffer, checkedAt: Date.now() })
      return
    }
    reportEvent('update_checked', { ext1: 'manual', ext2: isNewerVersion(version, PLUGIN_VERSION) ? 'available' : 'current' })
    if (isNewerVersion(version, PLUGIN_VERSION)) {
      const sameRelease = previousOffer !== null && version === previousOffer
      setCheck({ status: 'available', latestVersion: version, checkedAt: Date.now() })
      // Only a different release invalidates the notes already on screen.
      if (!sameRelease) {
        setNotes(NOTES_IDLE)
        setExpandedVersions({})
      }
    } else {
      setCheck({ status: 'current', latestVersion: null, checkedAt: Date.now() })
      setNotes(NOTES_IDLE)
      setExpandedVersions({})
    }
  }, [check.status, check.latestVersion])

  const toggleVersion = React.useCallback((version: string) => {
    setExpandedVersions(previous => ({ ...previous, [version]: previous[version] !== true }))
  }, [])

  // Notes load as soon as an update is offered: the card shows the release
  // content by default, not behind a disclosure.
  // The feed answers with every release between the running build and the
  // published one, so a multi-version jump is grouped instead of flattened.
  React.useEffect(() => {
    if (check.status !== 'available' || check.latestVersion === null) return undefined
    if (notes.status !== 'idle') return undefined
    let active = true
    setNotes(previous => ({ ...previous, status: 'loading' }))
    fetchReleaseHistory(PLUGIN_VERSION, check.latestVersion).then(result => {
      if (!active) return
      const entries = result.entries.map(entry => ({
        version: entry.version,
        url: entry.url,
        groups: updateNotesForLocale(entry.body, localeId),
      }))
      if (entries.length === 0) {
        setNotes({ status: 'error', entries: [], truncated: false })
        return
      }
      setNotes({ status: 'ready', entries, truncated: result.truncated })
      // The release being installed opens; older ones wait for a click.
      const newest = entries[0].version
      setExpandedVersions({ [newest]: true })
    })
    return () => {
      active = false
    }
    // `notes.status` is intentionally not a dependency: setting "loading" here
    // would invalidate the effect and its cleanup would discard the answer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check.status, check.latestVersion, localeId])

  const startUpdate = React.useCallback(async () => {
    // The button only disables on the next render, so the click guard has to be
    // a ref: two rapid clicks in the same frame would otherwise both reach the
    // host and fight over its single update lock.
    if (starting.current) return
    if (runRef.current.phase === 'starting' || runRef.current.phase === 'running') return
    // A finished run locks only the version it installed. Once a newer release
    // is offered, the same click has to be able to fetch that one.
    if (runRef.current.phase === 'done' && runRef.current.installedVersion === latestRef.current) return
    starting.current = true
    try {
      setRun(terminalRun('starting'))
      const target = latestRef.current
      if (target === null) {
        setRun(terminalRun('error', { failureCode: 'AUTO_UPDATE_UNAVAILABLE', retryable: false }))
        return
      }
      // The host installs over the running copy without removing it, which is
      // the only path that works while this panel is open on Desktop.
      setRun(terminalRun('running'))
      const host = await applyHostUpdate(target)
      if (disposed.current) return
      if (host.kind === 'ok') {
        reportEvent('update_started', { ext1: 'host', ext2: 'done' })
        setRun(terminalRun('done', {
          installedVersion: host.installedVersion,
          refreshRequired: !host.restartRequired,
          restartRequired: host.restartRequired,
        }))
        return
      }
      if (host.kind === 'error') {
        reportEvent('update_started', { ext1: 'host', ext2: 'failed' })
        setRun(terminalRun('error', {
          failureCode: host.code,
          message: host.hint ?? host.message,
          retryable: host.retryable,
        }))
        return
      }
      // No update route on this host: the card's command path is the only
      // automatic option left, and it has to render.
      reportEvent('update_started', { ext1: 'host', ext2: 'failed' })
      setRun(terminalRun('error', { failureCode: 'AUTO_UPDATE_UNAVAILABLE', retryable: false }))
    } finally {
      starting.current = false
    }
  }, [])

  const refreshPage = React.useCallback(() => {
    try {
      window.location.reload()
    } catch {
      /* a host without location simply keeps the message */
    }
  }, [])

  /** Copy the ready-to-paste update prompt; the caller reports the outcome. */
  const copyPrompt = React.useCallback((text: string) => copyText(text), [])

  const fullReleaseUrl = notes.entries[0]?.url || (latestVersion
    ? `${PLUGIN_REPO_URL}/releases/tag/v${latestVersion}`
    : null)

  return {
    check,
    latestVersion,
    notes,
    expandedVersions,
    releasesUrl: `${PLUGIN_REPO_URL}/releases`,
    run,
    fullReleaseUrl,
    checkNow,
    toggleVersion,
    startUpdate,
    refreshPage,
    copyPrompt,
  }
}
