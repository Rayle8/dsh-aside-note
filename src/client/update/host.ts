/**
 * The host-side update, as the panel sees it.
 *
 * The host half of this package exposes two same-origin endpoints; a browser
 * cannot install a package itself. Nothing here throws: every branch answers
 * with a value the card can render, because "the host has no update route"
 * (an older build, or a headless host) must fall back to the market path
 * rather than look like a failed update.
 */

/** Where the host listens; keep in sync with `host/route.js`. */
export const HOST_APPLY_PATH = '/dsh-aside-note/update/apply'

/** An install can be slow (pnpm download, build scripts) but not unbounded. */
const APPLY_TIMEOUT_MS = 5 * 60 * 1000

export type HostRoute = 'dsh' | 'dsh-plugin' | 'package-manager' | 'none'

export type HostUpdateOutcome =
  | {
      kind: 'ok'
      route: HostRoute
      previousVersion?: string
      installedVersion: string
      updated: boolean
      restartRequired: boolean
      output?: string
    }
  | { kind: 'error'; code: string; message: string; retryable: boolean; hint?: string }
  /** No update route on this host: the caller keeps its own fallback order. */
  | { kind: 'unavailable' }

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value : undefined
}

/**
 * Ask the host to install `target` over the running copy.
 *
 * @param target exact version, as the version check resolved it
 */
export async function applyHostUpdate(target: string): Promise<HostUpdateOutcome> {
  const controller = typeof AbortController === 'function' ? new AbortController() : undefined
  const timer = setTimeout(() => controller?.abort(), APPLY_TIMEOUT_MS)
  let response: Response
  try {
    response = await fetch(HOST_APPLY_PATH, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ target }),
      ...(controller === undefined ? {} : { signal: controller.signal }),
    })
  } catch {
    // A host without this route answers 404; a host that is gone answers
    // nothing. Both mean "not available here", not "the update failed".
    return { kind: 'unavailable' }
  } finally {
    clearTimeout(timer)
  }
  if (response.status === 404) return { kind: 'unavailable' }
  let body: any
  try {
    body = await response.json()
  } catch {
    return { kind: 'unavailable' }
  }
  if (body?.ok === true) {
    return {
      kind: 'ok',
      route: body.route === 'dsh-plugin' || body.route === 'package-manager' || body.route === 'none' ? body.route : 'dsh',
      ...(text(body.previousVersion) === undefined ? {} : { previousVersion: text(body.previousVersion) }),
      installedVersion: text(body.installedVersion) ?? target,
      updated: body.updated === true,
      restartRequired: body.restartRequired === true,
      ...(text(body.output) === undefined ? {} : { output: text(body.output) }),
    }
  }
  return {
    kind: 'error',
    code: text(body?.code) ?? 'UPDATE_FAILED',
    message: text(body?.message) ?? 'the host refused the update',
    retryable: body?.retryable === true,
    ...(text(body?.hint) === undefined ? {} : { hint: text(body.hint) }),
  }
}
