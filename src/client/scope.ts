/**
 * Which list the panel is looking at.
 *
 * The dock captures the session currently on screen, and the workspace that
 * owns it. A session in a workspace can share that workspace's list; the
 * panel header switches between the workspace list and the session list, and a
 * session without a workspace always keeps the session list. The
 * binding is module state rather than React state because the header entry is
 * plain DOM and needs the same answer without a component tree.
 */

export type ScopeMode = 'workspace' | 'session'

export interface MemoScope {
  kind: 'workspace' | 'session'
  id: string
  title: string
  sessionIds: string[]
}

interface WorkspaceBinding {
  sessionId: string
  workspaceId: string
  title: string
  sessionIds: string[]
}

const EMPTY: WorkspaceBinding = { sessionId: '', workspaceId: '', title: '', sessionIds: [] }
let binding: WorkspaceBinding = EMPTY

const text = value => (value ? String(value) : '')

/** Resolve the workspace of the captured session; null clears the binding. */
export function bindWorkspace(sessionId, workspace) {
  const next: WorkspaceBinding = workspace
    ? {
        sessionId: text(sessionId),
        workspaceId: text(workspace.workspaceId),
        title: text(workspace.title),
        sessionIds: Array.isArray(workspace.sessionIds) ? workspace.sessionIds.map(text).filter(Boolean) : [],
      }
    : { ...EMPTY, sessionId: text(sessionId) }
  if (
    next.sessionId === binding.sessionId &&
    next.workspaceId === binding.workspaceId &&
    next.title === binding.title &&
    next.sessionIds.join('\u0000') === binding.sessionIds.join('\u0000')
  ) return false
  binding = next
  return true
}

/** The workspace list available to this session, or null outside a workspace. */
export function workspaceScopeForSession(sessionId): MemoScope | null {
  const id = text(sessionId)
  if (id && binding.sessionId === id && binding.workspaceId) {
    return { kind: 'workspace', id: binding.workspaceId, title: binding.title, sessionIds: binding.sessionIds }
  }
  return null
}

/** The list this session reads and writes under the chosen scope mode. */
export function scopeForSession(sessionId, mode: ScopeMode = 'workspace'): MemoScope {
  const workspace = workspaceScopeForSession(sessionId)
  if (workspace && mode !== 'session') return workspace
  const id = text(sessionId)
  return { kind: 'session', id, title: '', sessionIds: id ? [id] : [] }
}

/** Stable key for the forward marks of one list. */
export function scopeKey(scope) {
  if (!scope || !scope.id) return ''
  return scope.kind === 'workspace' ? `ws:${scope.id}` : String(scope.id)
}
