/**
 * The floating notes panel.
 *
 * State, handlers and effects for the list in view; the markup lives in the
 * sibling components, the geometry in usePanelGeometry and the store in
 * useSessionMemoStore.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { PANEL_DEFAULT_WIDTH, SCOPE_MODE_KEY } from '../constants'
import { canUseSessionScope, draftKeyForSession, scopeForSession, scopeKey, scopeVersion, subscribeScope, workspaceScopeForSession } from '../scope'
import { notifyTodoChange } from '../storage/events'
import { readScopeMode, writeScopeMode } from '../storage/prefs'
import { ensureWorkspaceRecord } from '../storage/workspace'
import { storageMode } from '../storage/state'
import { useMemoStore } from './useSessionMemoStore'
import { usePanelGeometry } from './usePanelGeometry'

import { useSections } from './useSections'
import { useForwardMarks } from './useForwardMarks'
import { usePanelSettings } from './usePanelSettings'
import { useUpdateCenter } from './useUpdateCenter'
import { useComposerDraft } from './useComposerDraft'
import { useNoteActions } from './useNoteActions'
import { useClearConfirm } from './useClearConfirm'
import { useListEdge } from './useListEdge'
import { useOutsideDismiss } from './useOutsideDismiss'
import { saveEditDraft } from '../storage/drafts'
import { compareDoneItems } from '../domain/items'
import { reportEvent } from '../rum'

import { TodoRow } from './TodoRow'
import { PanelHead } from './PanelHead'
import { SettingsPanel } from './SettingsPanel'
import { ComposerForm } from './ComposerForm'
import { NoteList } from './NoteList'

const h = React.createElement

export function MemoPopover(props) {
  const say = props.say
  const localeService = props.locale
  // The locale service publishes a revision on every language switch. The
  // popover lives in its own React root, so without this subscription a panel
  // opened before the switch would keep the previous language until reopened.
  const subscribeLocale = React.useCallback(callback => {
    if (localeService && typeof localeService.subscribe === 'function') return localeService.subscribe(callback)
    return () => {}
  }, [localeService])
  const readLocaleRevision = React.useCallback(() => {
    if (!localeService) return 0
    try {
      const snapshot = typeof localeService.getSnapshot === 'function'
        ? localeService.getSnapshot()
        : localeService.getLocale()
      return snapshot && typeof snapshot.revision === 'number' ? snapshot.revision : 0
    } catch {
      return 0
    }
  }, [localeService])
  React.useSyncExternalStore(subscribeLocale, readLocaleRevision, () => 0)
  const localeId = typeof props.getLocaleId === 'function'
    ? props.getLocaleId()
    : (props.localeId || 'en')
  const sessionId = props.sessionId || ''
  /** The header switch remembers its choice; a workspace-less session stays session-scoped. */
  const [mode, setMode] = React.useState(() => readScopeMode())
  React.useEffect(() => {
    const onStorage = event => {
      if (event && event.key === SCOPE_MODE_KEY) setMode(readScopeMode())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  // Readiness lives in the module binding, not in React state: the header
  // entry and the panel must agree without a parent component between them.
  React.useSyncExternalStore(subscribeScope, scopeVersion, scopeVersion)
  const canUseWorkspace = Boolean(workspaceScopeForSession(sessionId))
  const canUseSession = canUseSessionScope(sessionId)
  // A blank new session keeps the workspace list even when the stored mode is
  // `session`; once its first turn lands, the stored mode applies again.
  const effectiveMode = canUseSession ? mode : 'workspace'
  const scope = scopeForSession(sessionId, effectiveMode)
  // Drafts follow the workspace, not the tab; the writer below still follows `scope`.
  const draftKey = draftKeyForSession(sessionId)
  /** Settled outcomes go to the frame-wide toast host, not to inline marks. */
  const report = typeof props.onToast === 'function' ? props.onToast : () => {}
  const { record, syncError, commit } = useMemoStore(scope)
  const { sectionsRef, showOpen, showDone, toggleOpen, toggleDone, applySections } = useSections()
  const { forwardedIds, rememberForwarded, unrememberForwarded, forgetForwardedItems } = useForwardMarks(scopeKey(scope))
  const {
    showSettings,
    setShowSettings,
    sendShortcut,
    chooseShortcut,
    forwardPrefix,
    changeForwardPrefix,
    resetForwardPrefix,
    prefixRef,
    analyticsEnabled,
    toggleAnalytics,
  } = usePanelSettings()
  // Version check, release notes and the in-app update share one hook; the
  // registry answer is cached for an hour across panel opens.
  const update = useUpdateCenter(localeId)
  const newerVersion = update.latestVersion
  const { draft, isSubmitting, addRef, composingRef, add, onDraftChange, onDraftKeyDown } = useComposerDraft({
    draftKey,
    commit,
    report,
    sendShortcut,
    scopeKind: scope.kind,
  })
  const { editingId, editDraft, setEditDraft, editRef, startEdit, finishEdit, cancelEdit, stopEditing, toggle, remove } = useNoteActions({
    draftKey,
    commit,
    report,
    forgetForwardedItems,
    scopeKind: scope.kind,
  })
  const { confirmClear, askClearConfirm, dismissClearConfirm, confirmClearDone } = useClearConfirm({
    sessionId,
    showDone,
    doneCount: record.items.filter(item => item.done).length,
    onConfirm: () => clearDone(),
  })
  const panelRef = React.useRef(null)
  const {
    style,
    commitPanelWidth,
    commitPanelHeight,
    startPanelResize,
    startPanelHeightResize,
    onPanelResizeKeyDown,
    onPanelHeightKeyDown,
  } = usePanelGeometry(props.anchorRef, props.placement, panelRef)

  const items = record.items || []
  const openItems = items.filter(item => !item.done)
  const doneItems = items.filter(item => item.done).sort(compareDoneItems)
  const openCount = openItems.length
  const total = items.length
  const { listRef, listHasMore, syncListEdge } = useListEdge({ items, showOpen, showDone })
  useOutsideDismiss(panelRef, props.anchorRef, props.onClose)

  const chooseScope = next => {
    if (next === mode) return
    if (next === 'session' && !canUseSession) return
    if (next === 'workspace' && !canUseWorkspace) return
    // The workspace may not have been seeded yet if the panel opened while the
    // session list was selected; fold member notes in before reading it.
    if (next === 'workspace') {
      const workspace = scopeForSession(sessionId, 'workspace')
      if (workspace.kind === 'workspace') void ensureWorkspaceRecord(workspace.id, workspace.sessionIds)
    }
    // Leaving a list abandons its inline editors and pending clear confirmation.
    writeScopeMode(next)
    setMode(next)
    // The draft is shared by both scopes, so closing the editor here must not
    // discard what was typed; reopening the row restores it.
    stopEditing()
    dismissClearConfirm()
    notifyTodoChange()
    reportEvent('note_scope_changed', { ext1: next })
  }

  const clearDone = async () => {
    // Capture the completed items before the commit so their forward flags can be cleared.
    const clearedItems = items.filter(item => item.done)
    const ok = await commit(currentItems => currentItems.filter(item => !item.done))
    if (!ok) {
      report('saveFailed')
      return
    }
    report('cleared')
    reportEvent('completed_notes_cleared', { ext1: scope.kind, ext2: String(clearedItems.length) })
    forgetForwardedItems(clearedItems.map(item => item.id))
    applySections({ open: sectionsRef.current.open, done: false })
  }

  const row = item => h(TodoRow, {
    key: item.id,
    item,
    done: item.done,
    say,
    localeId,
    scopeKind: scope.kind,
    onToast: report,
    onToggle: toggle,
    onStartEdit: startEdit,
    onDelete: remove,
    editing: editingId === item.id,
    editDraft,
    setEditDraft,
    onEditDraftChange: value => saveEditDraft(draftKey, item.id, value),
    onFinishEdit: finishEdit,
    onCancelEdit: cancelEdit,
    editRef,
    // `null` = untouched, so the row resolves the default in the active language
    // at click time; any string, including "", is the user's own prefix choice.
    forwardPrefix,
    forwardPrefixFallback: () => say('forward.prefix'),
    sendShortcut,
    forwarded: forwardedIds[item.id] === true,
    onForwarded: rememberForwarded,
    onUnforwarded: unrememberForwarded,
  })

  const content = h(
    'div',
    {
      ref: panelRef,
      className: props.placement === 'right' ? 'dsh-an-popover dsh-an-popoverRight' : 'dsh-an-popover',
      style,
      'data-settings': showSettings ? 'true' : undefined,
      role: 'dialog',
      'aria-label': say('popover.title'),
    },
    props.placement === 'right'
      ? h('div', {
          className: 'dsh-an-resizeHandle',
          role: 'separator',
          'aria-orientation': 'vertical',
          'aria-label': say('resize.width'),
          tabIndex: 0,
          title: say('resize.hint'),
          onPointerDown: startPanelResize,
          onDoubleClick: () => commitPanelWidth(PANEL_DEFAULT_WIDTH),
          onKeyDown: onPanelResizeKeyDown,
        })
      : null,
    props.placement === 'right'
      ? h('div', {
          className: 'dsh-an-resizeHandleBottom',
          role: 'separator',
          'aria-orientation': 'horizontal',
          'aria-label': say('resize.height'),
          tabIndex: 0,
          title: say('resize.hint'),
          onPointerDown: startPanelHeightResize,
          onDoubleClick: () => commitPanelHeight(0),
          onKeyDown: onPanelHeightKeyDown,
        })
      : null,
    h(PanelHead, {
      say,
      openCount,
      total,
      showSettings,
      onToggleSettings: () => {
        if (!showSettings) reportEvent('settings_opened')
        setShowSettings(value => !value)
      },
      onClose: props.onClose,
      newerVersion,
      scopeMode: effectiveMode,
      canUseWorkspace,
      canUseSession,
      onScopeChange: chooseScope,
    }),
    showSettings
      // The card scrolls on its own rail when the panel is shorter than the
      // settings, so nothing falls below the popover's clipped bottom edge.
      ? h(
          'div',
          { className: 'dsh-an-settingsViewport' },
          h(SettingsPanel, {
            say,
            sendShortcut,
            chooseShortcut,
            forwardPrefix,
            changeForwardPrefix,
            resetForwardPrefix,
            prefixRef,
            analyticsEnabled,
            onToggleAnalytics: toggleAnalytics,
            update,
            onToast: report,
          }),
        )
      : null,
    h(ComposerForm, {
      say,
      draft,
      isSubmitting,
      inputRef: addRef,
      sendShortcut,
      onDraftChange,
      onCompositionStart: () => { composingRef.current = true },
      onCompositionEnd: () => { composingRef.current = false },
      onKeyDown: onDraftKeyDown,
      onSubmit: event => {
        event.preventDefault()
        if (composingRef.current) return
        add()
      },
    }),
    h(NoteList, {
      say,
      listRef,
      listHasMore,
      syncListEdge,
      showOpen,
      toggleOpen,
      openItems,
      openCount,
      total,
      row,
      showDone,
      toggleDone,
      doneItems,
      confirmClear,
      askClearConfirm,
      dismissClearConfirm,
      confirmClearDone,
    }),
    h(
      'div',
      { className: 'dsh-an-popFoot', role: 'status' },
      h('span', { className: syncError || storageMode() === 'error' ? 'dsh-an-error' : undefined }, say(syncError
        ? 'storage.failed'
        : storageMode() === 'error'
          ? 'storage.hostError'
          : storageMode() === 'host'
            ? 'storage.whereHost'
            : storageMode() === 'probing'
              ? 'storage.loading'
              : 'popover.local')),
    ),
  )

  return ReactDOM.createPortal(content, document.body)
}
