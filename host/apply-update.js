/**
 * The in-app update, run inside the host.
 *
 * DSH's plugin manager replaces an installed package only after removing it,
 * and a running Desktop refuses to remove a bundle that a live fiber still
 * uses (`bundle-in-use`) — which is exactly the state this plugin is in while
 * its panel is open. So the update never removes anything: it asks DSH to
 * install over the package, and only when that is refused does it fall back to
 * DSH's own `dsh plugin add` and then to the profile's package manager.
 *
 * The three steps are ordered by "how much of DSH's own verification runs", not
 * by convenience: `installBundle` checks DSH peers and restores the profile on
 * failure, `dsh plugin add` does the same under the profile's write lock, and
 * the bare package manager is the last resort that still leaves a consistent
 * profile because it only rewrites the dependency and the lock.
 *
 * Nothing here talks to the browser; the route layer does. Everything the
 * update needs is injected so the ordering and the verification can be tested
 * without a host.
 */
import { PACKAGE, installedVersion } from './profile.js'
import { isExactVersion } from './versions.js'

/** An update failure with a stable code the panel can translate. */
export class UpdateError extends Error {
  /**
   * @param {string} code
   * @param {string} message
   * @param {{ retryable?: boolean, diagnostic?: string }} [extra]
   */
  constructor(code, message, extra = {}) {
    super(message)
    this.name = 'UpdateError'
    this.code = code
    this.retryable = extra.retryable === true
    this.diagnostic = extra.diagnostic
  }
}

/** How long one install step may take before the host stops waiting. */
export const UPDATE_TIMEOUT_MS = 10 * 60_000

/**
 * The command a person can run when no automatic path is available.
 * @param {string} profileDir
 * @param {string} target
 * @returns {string}
 */
export function manualCommand(profileDir, target) {
  return `npx -y ${PACKAGE} install --version ${target} --profile-dir "${profileDir}"`
}

/**
 * First line of a failed step worth showing: DSH's own diagnostic, else the
 * error line the package manager printed, else its last line.
 * @param {string} output
 * @returns {string}
 */
function failureLine(output) {
  const lines = String(output ?? '')
    .split(/\r?\n/u)
    .map(line => line.trim())
    .filter(line => line !== '')
  return (
    lines.findLast(line => /ERR_PNPM_[A-Z_]+/u.test(line)) ??
    lines.findLast(line => /^(?:\[?error\]?|\bERROR\b)|\brejected\b/iu.test(line)) ??
    lines.at(-1) ??
    'no output'
  )
}

/**
 * Install `target` over the installed copy and prove it landed.
 *
 * @param {{
 *   target: string,
 *   profileDir: string,
 *   installer?: { installBundle: (spec: string, options?: { enabled?: boolean }) => Promise<any> },
 *   pluginCommand?: (args: readonly string[]) => Promise<{ exitCode: number | null, output?: string, timedOut?: boolean, logPath?: string, kind?: string, incompatible?: readonly unknown[] }>,
 *   packageManager?: { command: string, args?: readonly string[], env?: Record<string, string> },
 *   runner?: (command: string, args: readonly string[], options: { cwd: string, env?: Record<string, string>, timeoutMs?: number }) => Promise<{ exitCode: number | null, stdout?: string, stderr?: string }>,
 *   readVersion?: (dir: string) => string | undefined,
 *   timeoutMs?: number,
 * }} input
 * @returns {Promise<{ route: 'dsh' | 'dsh-plugin' | 'package-manager' | 'none', previousVersion?: string, installedVersion: string, updated: boolean, restartRequired: boolean, output?: string }>}
 */
export async function applyUpdate(input) {
  const { target, profileDir } = input
  if (!isExactVersion(target)) throw new UpdateError('UPDATE_REJECTED', `not a version: ${String(target)}`)
  const readVersion = input.readVersion ?? installedVersion
  const timeoutMs = input.timeoutMs ?? UPDATE_TIMEOUT_MS
  const spec = `${PACKAGE}@${target}`

  const previousVersion = readVersion(profileDir)
  // Already there: say so instead of reinstalling over a working copy.
  if (previousVersion === target) {
    return { route: 'none', previousVersion, installedVersion: target, updated: false, restartRequired: false }
  }

  const verify = (route, output) => {
    const installed = readVersion(profileDir)
    if (installed !== target) {
      throw new UpdateError(
        'RESOLVED_VERSION_MISMATCH',
        `${spec} was not installed: found ${installed ?? 'no package'} after ${route}`,
        { retryable: true, diagnostic: output },
      )
    }
    return {
      route,
      ...(previousVersion === undefined ? {} : { previousVersion }),
      installedVersion: installed,
      updated: true,
      // DSH keeps the loaded build until it restarts, so the caller must say so.
      restartRequired: true,
      ...(output === undefined || output === '' ? {} : { output: String(output).slice(-4_000) }),
    }
  }

  // 1. DSH's own installer: checks compatibility and restores the profile on failure.
  if (input.installer?.installBundle !== undefined) {
    let change
    try {
      // `enabled: false` leaves the profile's bundle selection alone: this
      // upgrades the package, it does not add or drop a row.
      change = await input.installer.installBundle(spec, { enabled: false })
    } catch (error) {
      throw new UpdateError('UPDATE_FAILED', `DSH could not install ${spec}: ${messageOf(error)}`)
    }
    const refusal = change?.error?.code
    if (change?.application === 'failed' && refusal !== 'already-installed') {
      throw new UpdateError(
        typeof refusal === 'string' && refusal !== '' ? refusal : 'UPDATE_FAILED',
        `DSH refused ${spec}${typeof change?.error?.diagnostic === 'string' ? `: ${change.error.diagnostic}` : ''}`,
        { retryable: refusal === 'bundle-in-use' || refusal === 'OPERATION_BUSY' },
      )
    }
    if (change?.application !== 'failed') return verify('dsh', change?.packageResult?.output)
    // `already-installed` means this DSH replaces a package only after removing
    // it; removing is what a running host refuses, so ask the plugin command.
  }

  // 2. DSH's own `dsh plugin add`: replaces in place under the profile's lock.
  if (input.pluginCommand !== undefined) {
    let result
    try {
      result = await input.pluginCommand(['add', spec, '--save-exact'])
    } catch (error) {
      throw new UpdateError('UPDATE_FAILED', `DSH could not install ${spec}: ${messageOf(error)}`)
    }
    const refused = Array.isArray(result?.incompatible) && result.incompatible.length > 0
    if (refused || result?.exitCode !== 0 || result?.timedOut === true) {
      throw new UpdateError(
        refused ? 'incompatible-version' : 'UPDATE_FAILED',
        `DSH could not install ${spec}: ${failureLine(result?.output ?? '')}`,
        { retryable: result?.timedOut === true, diagnostic: result?.output },
      )
    }
    return verify('dsh-plugin', result?.output)
  }

  // 3. The profile's own package manager, which the launcher supplies.
  if (input.packageManager !== undefined && input.runner !== undefined) {
    const task = input.runner(
      input.packageManager.command,
      [...(input.packageManager.args ?? []), 'add', spec, '--save-exact'],
      { cwd: profileDir, ...(input.packageManager.env === undefined ? {} : { env: input.packageManager.env }), timeoutMs },
    )
    let result
    try {
      result = await task
    } catch (error) {
      throw new UpdateError('UPDATE_FAILED', `the profile's package manager failed: ${messageOf(error)}`)
    }
    if (result?.exitCode !== 0) {
      const output = [result?.stdout ?? '', result?.stderr ?? ''].join('\n').trim()
      throw new UpdateError('UPDATE_FAILED', `${input.packageManager.command} could not install ${spec}: ${failureLine(output)}`, {
        diagnostic: output,
      })
    }
    return verify('package-manager', [result?.stdout ?? '', result?.stderr ?? ''].join('\n').trim())
  }

  throw new UpdateError(
    'AUTO_UPDATE_UNAVAILABLE',
    'this host offers no installer for the running profile',
    { retryable: false, diagnostic: manualCommand(profileDir, target) },
  )
}

/**
 * @param {unknown} error
 * @returns {string}
 */
function messageOf(error) {
  return error instanceof Error ? error.message : String(error)
}
