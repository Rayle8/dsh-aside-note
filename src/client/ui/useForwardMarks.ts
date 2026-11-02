/** Which notes of this list were forwarded, plus the toggle-off bookkeeping. */
import React from 'react'
import { forgetForwarded, markForwarded, readForwardedIds } from '../storage/forwarded'

/**
 * Forward marks belong to the list, not to the conversation: the same note
 * stays marked while the user moves between sessions of one workspace.
 */
export function useForwardMarks(scopeKey) {
  const key = scopeKey ? String(scopeKey) : ''
  const [forwardedIds, setForwardedIds] = React.useState(() => readForwardedIds(key))
  const keyRef = React.useRef(key)

  // Only a genuine list switch re-reads the flags; parent re-renders keep this state.
  React.useEffect(() => {
    if (keyRef.current === key) return
    keyRef.current = key
    setForwardedIds(readForwardedIds(key))
  }, [key])

  /** Drop forwarded flags for notes that no longer render (deleted or cleared). */
  const forgetForwardedItems = itemIds => {
    const ids = (Array.isArray(itemIds) ? itemIds : [itemIds]).filter(Boolean)
    if (!ids.length) return
    forgetForwarded(key, ids)
    setForwardedIds(current => {
      if (!ids.some(id => current[id])) return current
      const next = { ...current }
      for (const id of ids) delete next[id]
      return next
    })
  }

  /** Remember a successful forward so the forward button keeps its check after closing the panel. */
  const rememberForwarded = item => {
    const id = item && item.id ? String(item.id) : ''
    if (!id) return
    markForwarded(key, id)
    setForwardedIds(current => (current[id] ? current : { ...current, [id]: true }))
  }

  /** Toggle the forward mark off; the note and its open/done state stay untouched. */
  const unrememberForwarded = item => {
    const id = item && item.id ? String(item.id) : ''
    if (!id) return
    forgetForwardedItems(id)
  }

  return { forwardedIds, rememberForwarded, unrememberForwarded, forgetForwardedItems }
}
