/** Row actions: toggle, delete, and the inline edit session. */
import React from 'react'
import { MAX_TEXT } from '../constants'
import { clearEditDraft, readEditDraft } from '../storage/drafts'
import { reportEvent } from '../rum'

export function useNoteActions({ draftKey, commit, report, forgetForwardedItems, scopeKind }) {
  const key = draftKey ? String(draftKey) : ''
  const [editingId, setEditingId] = React.useState(null)
  const [editDraft, setEditDraft] = React.useState('')
  const editRef = React.useRef(null)
  const cancelEditRef = React.useRef(false)

  React.useEffect(() => {
    if (!editingId || !editRef.current) return
    editRef.current.focus()
    editRef.current.select()
  }, [editingId])

  const resetEditing = itemId => {
    if (!editingId || editingId !== itemId) return
    setEditingId(null)
    setEditDraft('')
  }

  const toggle = item => {
    const ok = commit(currentItems => currentItems.map(candidate => {
      if (candidate.id !== item.id) return candidate
      const now = Date.now()
      return {
        ...candidate,
        done: !candidate.done,
        updatedAt: now,
        ...(candidate.done ? { completedAt: undefined } : { completedAt: now }),
      }
    }))
    if (!ok) {
      report('saveFailed')
      return
    }
    reportEvent('note_status_changed', { ext1: scopeKind, ext2: item.done ? 'open' : 'done' })
    if (item.id === editingId) {
      setEditingId(null)
      setEditDraft('')
      clearEditDraft(key, item.id)
    }
  }

  const remove = item => {
    const ok = commit(currentItems => currentItems.filter(candidate => candidate.id !== item.id))
    // A failed delete keeps the row, its draft and its forward flag exactly
    // as they were, and the toast carries the failure.
    if (!ok) {
      report('saveFailed')
      return
    }
    report('deleted')
    reportEvent('note_deleted', { ext1: scopeKind })
    clearEditDraft(key, item.id)
    forgetForwardedItems(item.id)
    resetEditing(item.id)
  }

  const startEdit = item => {
    cancelEditRef.current = false
    const saved = readEditDraft(key, item.id)
    setEditingId(item.id)
    setEditDraft(saved === null ? item.text : saved)
  }

  const finishEdit = item => {
    if (cancelEditRef.current) {
      cancelEditRef.current = false
      return
    }
    if (!editingId) return
    const text = editDraft.trim().slice(0, MAX_TEXT)
    if (text && text !== item.text) {
      const ok = commit(currentItems => currentItems.map(candidate => {
        if (candidate.id !== item.id) return candidate
        return { ...candidate, text, updatedAt: Date.now() }
      }))
      // Keeping the editor open preserves what the user typed.
      if (!ok) {
        report('saveFailed')
        return
      }
      reportEvent('note_edited', { ext1: scopeKind })
    }
    setEditingId(null)
    setEditDraft('')
    clearEditDraft(key, item.id)
  }

  const cancelEdit = () => {
    cancelEditRef.current = true
    const currentId = editingId
    setEditingId(null)
    setEditDraft('')
    if (currentId) clearEditDraft(key, currentId)
  }

  /**
   * Close the editor without discarding the stored draft. Switching the
   * workspace/session scope only changes which list is shown; the text belongs
   * to the draft scope, so reopening the row must restore it.
   */
  const stopEditing = () => {
    cancelEditRef.current = true
    setEditingId(null)
    setEditDraft('')
  }

  return { editingId, editDraft, setEditDraft, editRef, startEdit, finishEdit, cancelEdit, stopEditing, toggle, remove }
}
