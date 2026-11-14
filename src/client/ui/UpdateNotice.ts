/**
 * Settings › About › update centre.
 *
 * One compact card: the published version, the release notes it ships with, and
 * the update action. The notes load and show as soon as an update is offered —
 * they are not hidden behind a disclosure. The action is a button, never
 * automatic: one host request installs the offered version, and the panel
 * reports the outcome instead of guessing.
 *
 * When the host has no update route, or refuses the install in a way a terminal
 * command can get past, the card states the exact command — with one click to
 * copy a ready-to-paste prompt for an agent. The panel never runs a package
 * manager itself.
 *
 * A jump across several versions lists each release separately: the newest one
 * opens by default and the ones behind it expand on demand, so a 2.0.0 install
 * upgrading to 2.3.0 can read 2.1.0, 2.2.0 and 2.3.0 in order. The full release
 * page opens from the link beside the update button.
 */
import React from 'react'
import type { NotesEntry, NotesState, RunPhase, UpdateRunState } from './useUpdateCenter'
import type { ReleaseNoteGroup } from '../update/releaseNotes'
import { isPrereleaseVersion } from '../update/latest'
import { reportEvent } from '../rum'

const h = React.createElement

const NOTES_ID = 'dsh-an-update-notes'
const UPDATE_PACKAGE = 'dsh-aside-note'

/** Failure codes the card can explain without echoing the host's message. */
const FAILURE_COPY: Record<string, string> = {
  PLUGIN_NOT_INSTALLED: 'update.notInstalled',
  UPDATE_FORBIDDEN: 'update.forbidden',
  UPDATE_REJECTED: 'update.rejected',
  OPERATION_BUSY: 'update.busy',
  UPDATE_TIMEOUT: 'update.timeout',
  // DSH's own refusals, forwarded unchanged by the host. Desktop answers
  // `bundle-in-use` for every plugin that is loaded while it is asked to remove
  // one — which is exactly this panel's state while it is open.
  'bundle-in-use': 'update.bundleInUse',
  'already-installed': 'update.alreadyInstalled',
  'management-required': 'update.managementRequired',
  'not-removable': 'update.notRemovable',
  'stop-profile': 'update.stopProfile',
  'incompatible-version': 'update.incompatible',
  RESOLVED_VERSION_MISMATCH: 'update.versionMismatch',
  DOWNGRADE_DETECTED: 'update.downgrade',
  AUTO_UPDATE_UNAVAILABLE: 'update.autoUnavailable',
}

/** Refusals a terminal command can actually get past. */
const MANUAL_FALLBACK: ReadonlySet<string> = new Set([
  'OPERATION_BUSY',
  'bundle-in-use',
  'already-installed',
  'management-required',
  'not-removable',
  'stop-profile',
  'AUTO_UPDATE_UNAVAILABLE',
])

export function UpdateNotice(props: {
  say: (key: string, vars?: Record<string, any>) => string
  latestVersion: string | null
  notes: NotesState
  expandedVersions: Record<string, boolean>
  releasesUrl: string
  run: UpdateRunState
  fullReleaseUrl: string | null
  onToggleVersion: (version: string) => void
  onStartUpdate: () => void
  onRefresh: () => void
  onCopyPrompt: (text: string) => Promise<boolean>
  onToast?: (kind: string) => void
}) {
  const { say, latestVersion, notes, expandedVersions, run, fullReleaseUrl } = props
  const notesRef = React.useRef<HTMLDivElement | null>(null)
  const [fade, setFade] = React.useState(false)

  const syncFade = React.useCallback(() => {
    const node = notesRef.current
    if (!node) {
      setFade(false)
      return
    }
    const overflow = node.scrollHeight > node.clientHeight + 1
    const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1
    setFade(overflow && !atBottom)
  }, [])

  React.useEffect(() => {
    const node = notesRef.current
    if (!node) return undefined
    const frame = requestAnimationFrame(syncFade)
    const onScroll = () => syncFade()
    node.addEventListener('scroll', onScroll, { passive: true })
    let observer: any = null
    if (typeof ResizeObserver === 'function') {
      observer = new ResizeObserver(syncFade)
      observer.observe(node)
    }
    window.addEventListener('resize', syncFade)
    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', syncFade)
      observer?.disconnect()
    }
  }, [notes.status, notes.entries, expandedVersions, syncFade])

  if (latestVersion === null) return null

  const phase: RunPhase = run.phase
  const busy = phase === 'starting' || phase === 'running'
  const failureKey = run.failureCode ? FAILURE_COPY[run.failureCode] : ''
  /**
   * The host reports the exact command (with the profile directory) for the
   * failures a terminal can get past. When a refusal has no command of its own,
   * pin the offered version here so a later release cannot slip in between the
   * card and the paste.
   */
  const manualCommand = React.useMemo(() => {
    const hinted = run.message?.trim() ?? ''
    const prerelease = isPrereleaseVersion(latestVersion)
    // A host from an older build may send a command that omits the version, or
    // one that omits the npmjs pin for a prerelease. Use its hint only when it
    // names both, so the card cannot hand over a command that installs the
    // stable line.
    const hintPinsTarget = hinted.includes(latestVersion)
    const hintPinsRegistry = !prerelease || hinted.includes('--registry=https://registry.npmjs.org/')
    if (/^npx\s/u.test(hinted) && hintPinsTarget && hintPinsRegistry) return hinted
    const registry = prerelease ? ' --registry=https://registry.npmjs.org/' : ''
    const packageSpec = prerelease ? `${UPDATE_PACKAGE}@${latestVersion}` : UPDATE_PACKAGE
    return `npx -y${registry} ${packageSpec} install --version ${latestVersion}`
  }, [run.message, latestVersion])
  /**
   * No host route, or a refusal a terminal can get past: the user needs the
   * command now, not a "try again later" with nothing behind it. The panel never
   * runs a package manager itself.
   */
  const manual = run.failureCode !== null && MANUAL_FALLBACK.has(run.failureCode)

  /**
   * Hand the user a prompt they can paste into an agent; report the outcome.
   * The command pins the version this card offered, so a release published
   * between render and click cannot silently change the target.
   */
  const copyPrompt = () => {
    const text = say('update.prompt', { version: latestVersion, command: manualCommand })
    Promise.resolve(props.onCopyPrompt(text)).then(ok => {
      // The command channel of the update flow: the card hands the terminal
      // prompt over instead of driving an installer.
      reportEvent('update_started', { ext1: 'command', ext2: ok ? 'copied' : 'copy_failed' })
      if (typeof props.onToast === 'function') props.onToast(ok ? 'copied' : 'copyFailed')
    })
  }

  const noteGroups = (list: ReleaseNoteGroup[]) => list.map((group, index) =>
    h(
      'div',
      { key: `${group.title}-${index}`, className: 'dsh-an-updateGroup' },
      group.title ? h('div', { className: 'dsh-an-updateGroupTitle' }, group.title) : null,
      h(
        'ul',
        { className: 'dsh-an-updateItems' },
        group.items.map((item, itemIndex) =>
          h(
            'li',
            { key: itemIndex, className: 'dsh-an-updateItem' },
            item.lead ? h('strong', null, item.lead) : null,
            item.lead ? ' ' : null,
            item.body,
          ),
        ),
      ),
    ),
  )

  const entryBody = (entry: NotesEntry) => (entry.groups.length > 0
    ? noteGroups(entry.groups)
    : h('p', { className: 'dsh-an-updateHint' }, say('update.notesMissing')))

  const notesBody = notes.status === 'loading'
    ? h('p', { className: 'dsh-an-updateHint' }, say('update.notesLoading'))
    : notes.status === 'error'
      ? h('p', { className: 'dsh-an-updateHint' }, say('update.notesFailed'))
      : notes.status === 'ready' && notes.entries.length === 1
        ? entryBody(notes.entries[0])
        : notes.status === 'ready'
          ? h(
              'div',
              { className: 'dsh-an-updateVersions' },
              h('p', { className: 'dsh-an-updateHint' }, say('update.historyCount', { n: notes.entries.length })),
              notes.entries.map((entry, index) => {
                const open = expandedVersions[entry.version] === true
                return h(
                  'div',
                  { key: entry.version, className: 'dsh-an-updateVersion' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dsh-an-updateVersionHead',
                      'aria-expanded': open,
                      'aria-controls': `${NOTES_ID}-${entry.version}`,
                      onClick: () => props.onToggleVersion(entry.version),
                    },
                    h('span', {
                      className: 'dsh-an-updateChevron',
                      'data-open': open ? 'true' : 'false',
                      'aria-hidden': true,
                    }, '▸'),
                    h('span', { className: 'dsh-an-updateVersionLabel' }, `v${entry.version}`),
                    index === 0 ? h('span', { className: 'dsh-an-updateLatest' }, say('update.latest')) : null,
                  ),
                  open
                    ? h(
                        'div',
                        { id: `${NOTES_ID}-${entry.version}`, className: 'dsh-an-updateVersionBody' },
                        entryBody(entry),
                      )
                    : null,
                )
              }),
              notes.truncated
                ? h(
                    'a',
                    { className: 'dsh-an-updateFull', href: props.releasesUrl, target: '_blank', rel: 'noreferrer' },
                    say('update.olderNotes'),
                  )
                : null,
            )
          : null

  return h(
    'div',
    { className: 'dsh-an-updateCard' },
    h('div', { className: 'dsh-an-updateTitle' }, say('update.available', { version: `v${latestVersion}` })),
    h(
      'div',
      {
        id: NOTES_ID,
        ref: notesRef,
        className: 'dsh-an-updateNotes',
        role: 'region',
        'aria-label': say('update.notesTitle'),
        'data-fade': fade ? 'true' : undefined,
      },
      notesBody,
    ),
    h(
      'div',
      { className: 'dsh-an-updateActions' },
      phase === 'done'
        ? h(
          'div',
          { className: 'dsh-an-updateDone' },
              h('span', { className: 'dsh-an-updateHint' }, say('update.updated', {
                version: run.installedVersion ? `v${run.installedVersion}` : `v${latestVersion}`,
              })),
              // In-app restart belongs to the host, which this panel does not
              // own; a page reload is the only action it can take.
              h('button', { type: 'button', className: 'dsh-an-updatePrimary', onClick: props.onRefresh }, say('update.refresh')),
            )
          : h(
              'button',
              {
                type: 'button',
                className: 'dsh-an-updatePrimary',
                disabled: busy,
                'aria-busy': busy,
                onClick: () => props.onStartUpdate(),
              },
              busy
                ? (phase === 'running' ? say('update.updating') : say('update.starting'))
                : say('update.now'),
            ),
      fullReleaseUrl
        ? h(
            'a',
            {
              className: 'dsh-an-updateFull',
              href: fullReleaseUrl,
              target: '_blank',
              rel: 'noreferrer',
            },
            say('update.full'),
          )
        : null,
    ),
    phase === 'error'
      ? h(
          'div',
          { className: 'dsh-an-updateErrorRow' },
          h(
            'p',
            { className: 'dsh-an-updateError', role: 'status' },
            failureKey
              ? say(failureKey)
              : say('update.failed', { reason: run.message || run.failureCode || '' }),
          ),
        )
      : null,
    manual
      ? h(
          'div',
          { className: 'dsh-an-updateFallback' },
          h('p', { className: 'dsh-an-updateHint' }, say('update.manualHint', { command: manualCommand })),
          h(
            'button',
            { type: 'button', className: 'dsh-an-updateCopy', onClick: copyPrompt },
            say('update.copyPrompt'),
          ),
        )
      : null,
    run.phase === 'done' && run.restartRequired
      ? h('p', { className: 'dsh-an-updateHint' }, say('update.restartHint'))
      : null,
  )
}
