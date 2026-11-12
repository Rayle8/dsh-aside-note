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
import { draftKeyForSession, scopeForSession, scopeKey, workspaceScopeForSession } from '../scope'
import { notifyTodoChange } from '../storage/events'
import { readScopeMode, writeScopeMode } from '../storage/prefs'
import { ensureWorkspaceRecord } from '../storage/workspace'
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

import { TodoRow } from './TodoRow'
import { PanelHead } from './PanelHead'
import { SettingsPanel } from './SettingsPanel'
import { ComposerForm } from './ComposerForm'
import { NoteList } from './NoteList'

const h = React.createElement

export function MemoPopover(props) {
  const say = props.say
  const localeId = props.localeId
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
  const canUseWorkspace = Boolean(workspaceScopeForSession(sessionId))
  const scope = scopeForSession(sessionId, mode)
  // Drafts follow the workspace, not the tab; the writer below still follows `scope`.
  const draftKey = draftKeyForSession(sessionId)
  /** Settled outcomes go to the frame-wide toast host, not to inline marks. */
  const report = typeof props.onToast === 'function' ? props.onToast : () => {}
  const { record, syncError, commit } = useMemoStore(scope)
  const { sectionsRef, showOpen, showDone, toggleOpen, toggleDone, applySections } = useSections()
  const { forwardedIds, rememberForwarded, unrememberForwarded, forgetForwardedItems } = useForwardMarks(scopeKey(scope))
  const { showSettings, setShowSettings, sendShortcut, chooseShortcut, forwardPrefix, changeForwardPrefix, prefixRef } = usePanelSettings()
  // Version check, release notes and the in-app update share one hook; the
  // registry answer is cached for an hour across panel opens.
  const update = useUpdateCenter(localeId)
  const newerVersion = update.latestVersion
  const { draft, addRef, composingRef, add, onDraftChange, onDraftKeyDown } = useComposerDraft({ draftKey, commit, report, sendShortcut })
  const { editingId, editDraft, setEditDraft, editRef, startEdit, finishEdit, cancelEdit, stopEditing, toggle, remove } = useNoteActions({
    draftKey,
    commit,
    report,
    forgetForwardedItems,
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
    if (next === 'workspace' && !canUseWorkspace) return
    // The workspace may not have been seeded yet if the panel opened while the
    // session list was selected; fold member notes in before reading it.
    if (next === 'workspace') {
      const workspace = scopeForSession(sessionId, 'workspace')
      if (workspace.kind === 'workspace') ensureWorkspaceRecord(workspace.id, workspace.sessionIds)
    }
    // Leaving a list abandons its inline editors and pending clear confirmation.
    writeScopeMode(next)
    setMode(next)
    // The draft is shared by both scopes, so closing the editor here must not
    // discard what was typed; reopening the row restores it.
    stopEditing()
    dismissClearConfirm()
    notifyTodoChange()
  }

  const clearDone = () => {
    // Capture the completed items before the commit so their forward flags can be cleared.
    const clearedItems = items.filter(item => item.done)
    const ok = commit(currentItems => currentItems.filter(item => !item.done))
    if (!ok) {
      report('saveFailed')
      return
    }
    report('cleared')
    forgetForwardedItems(clearedItems.map(item => item.id))
    applySections({ open: sectionsRef.current.open, done: false })
  }

  const row = item => h(TodoRow, {
    key: item.id,
    item,
    done: item.done,
    say,
    localeId,
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
    forwardPrefix: forwardPrefix.trim() ? forwardPrefix : say('forward.prefix'),
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
      onToggleSettings: () => setShowSettings(value => !value),
      onClose: props.onClose,
      newerVersion,
      scopeMode: mode,
      canUseWorkspace,
      onScopeChange: chooseScope,
    }),
    showSettings
      ? h(SettingsPanel, {
          say,
          sendShortcut,
          chooseShortcut,
          forwardPrefix,
          changeForwardPrefix,
          prefixRef,
          update,
          onToast: report,
        })
      : null,
    h(ComposerForm, {
      say,
      draft,
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
      h('span', { className: syncError ? 'dsh-an-error' : undefined }, say(syncError
        ? 'storage.failed'
        : scope.kind === 'workspace' ? 'popover.shared' : 'popover.storage')),
    ),
  )

  return ReactDOM.createPortal(content, document.body)
}
