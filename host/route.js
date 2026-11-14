/**
 * The host endpoints the panel's update card talks to.
 *
 * These exist because the browser cannot install a package: the plugin's own
 * client half used to delegate to the plugin market, whose update removes the
 * bundle first and is therefore refused by Desktop while the panel is open.
 * This route runs inside the host, where DSH's installer and the profile's
 * package manager are both reachable.
 *
 * The surface is deliberately tiny and same-origin: one read, one mutation.
 */
import { UpdateError, applyUpdate, manualCommand } from './apply-update.js'
import { runProcess } from './exec.js'
import { PACKAGE, dependencySpec, installMode, installedVersion, isProfileDir, profileDirOf } from './profile.js'
import { compareVersions, isExactVersion, isPrerelease } from './versions.js'

export const PROBE_PATH = '/dsh-aside-note/update/probe'
export const APPLY_PATH = '/dsh-aside-note/update/apply'

const REGISTRIES = ['https://registry.npmjs.org', 'https://registry.npmmirror.com']
/** Failures a terminal command can get past; the card shows the exact command for these. */
const MANUAL_HINT_CODES = new Set([
  'AUTO_UPDATE_UNAVAILABLE',
  'bundle-in-use',
  'already-installed',
  'management-required',
  'not-removable',
  'stop-profile',
])
const CHECK_TIMEOUT_MS = 8_000
const BODY_LIMIT = 4 * 1024

/**
 * Read one JSON response with a deadline; undefined when it is unreachable.
 * @param {string} url
 * @returns {Promise<any>}
 */
async function readJson(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { accept: 'application/json', 'user-agent': 'dsh-aside-note-host' },
    })
    if (!response.ok) return undefined
    return await response.json()
  } catch {
    return undefined
  } finally {
    clearTimeout(timer)
  }
}

/**
 * The version npm publishes for this package, trying the mirror when npmjs
 * does not answer. Undefined means "could not check", which the panel shows
 * as such rather than as "up to date".
 *
 * A prerelease build also reads `next` — that is where every prerelease is
 * published, and `latest` never carries one — and a stable build reads
 * `latest` alone, so a prerelease cannot reach a regular user.
 *
 * @param {string | undefined} current the installed version
 * @returns {Promise<string | undefined>}
 */
export async function fetchLatestVersion(current) {
  const channels = isPrerelease(current) ? ['latest', 'next'] : ['latest']
  for (const registry of REGISTRIES) {
    const versions = await Promise.all(channels.map(channel =>
      readJson(`${registry}/${encodeURIComponent(PACKAGE)}/${encodeURIComponent(channel)}`).then(body =>
        typeof body?.version === 'string' ? { channel, version: body.version } : undefined,
      ),
    ))
    const found = versions.filter(Boolean)
    if (found.length === 0) continue
    let best
    for (const entry of found) {
      // `next` is prerelease-only by contract; a release tagged there would
      // otherwise be promoted silently.
      if (entry.channel !== 'latest' && !isPrerelease(entry.version)) continue
      if (best === undefined || compareVersions(entry.version, best) > 0) best = entry.version
    }
    if (best !== undefined) return best
  }
  return undefined
}

/**
 * @param {import('node:http').ServerResponse} response
 * @param {number} status
 * @param {unknown} body
 */
function sendJson(response, status, body) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  response.end(JSON.stringify(body))
}

/**
 * Reject requests that a page other than this host's could have made.
 *
 * Same rule the plugin market applies: a cross-site hint is refused outright, a
 * present Origin must name this Host, and an absent Origin is allowed because
 * the Desktop shell's proxy strips it (#648).
 * @param {import('node:http').IncomingMessage} request
 * @returns {boolean}
 */
export function sameOrigin(request) {
  if (request.headers['sec-fetch-site'] === 'cross-site') return false
  const origin = request.headers.origin
  if (origin === undefined) return true
  try {
    return new URL(origin).host === request.headers.host
  } catch {
    return false
  }
}

/**
 * @param {import('node:http').IncomingMessage} request
 * @returns {Promise<any>}
 */
async function readBody(request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buffer.length
    if (size > BODY_LIMIT) throw new UpdateError('UPDATE_REJECTED', 'request body too large')
    chunks.push(buffer)
  }
  if (chunks.length === 0) return {}
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw new UpdateError('UPDATE_REJECTED', 'invalid JSON body')
  }
}

/**
 * DSH's own `dsh plugin add`, bound to the profile this host runs in — the same
 * command the plugin market uses to replace a package in place.
 * @param {any} profileContext
 * @returns {Promise<((args: readonly string[]) => Promise<any>) | undefined>}
 */
async function pluginCommandOf(profileContext) {
  const profile = profileContextOf(profileContext)
  if (profile === undefined) return undefined
  // A variable specifier keeps the import out of the bundler's graph.
  const specifier = '@deepseek-ai/dsh-plugin-manager/operations'
  let operations
  try {
    operations = await import(specifier)
  } catch {
    return undefined
  }
  const run = operations?.runPluginCommand
  if (typeof run !== 'function') return undefined
  return args =>
    run(
      { profile: profile.name, dir: profile.dir, installAnchor: profile.installAnchor, cwd: profile.cwd, home: profile.home },
      args,
      {
        execution: 'service',
        ...(profile.packageManager === undefined ? {} : profile.packageManager),
        outputBytes: 16 * 1024,
        activateNewBundles: false,
        signal: AbortSignal.timeout(10 * 60_000),
      },
    )
}

/**
 * The launcher's record of the profile it runs, or undefined when this host
 * does not have one.
 * @param {any} value
 */
function profileContextOf(value) {
  if (value === null || typeof value !== 'object') return undefined
  const required = ['name', 'dir', 'installAnchor', 'cwd', 'home']
  if (!required.every(key => typeof value[key] === 'string')) return undefined
  return {
    name: value.name,
    dir: value.dir,
    installAnchor: value.installAnchor,
    cwd: value.cwd,
    home: value.home,
    packageManager: typeof value.packageManager === 'object' && value.packageManager !== null ? value.packageManager : undefined,
  }
}

/**
 * Register the update endpoints on the host's web server.
 *
 * @param {{ register?: (route: { kind: 'exact', path: string, handler: (request: any, response: any) => unknown }) => unknown }} server
 * @param {{ ctx: any, config?: any }} options
 * @returns {(() => void) | undefined}
 */
export function registerUpdateRoutes(server, options) {
  if (typeof server?.register !== 'function') return undefined
  const ctx = options.ctx
  /** @type {{ promise?: Promise<unknown> }} */
  const state = {}

  const resolveProfile = () => {
    const dir = profileDirOf(ctx.get('profileContext'))
    return isProfileDir(dir) ? dir : undefined
  }

  const installerOf = () => {
    const manager = ctx.get('pluginManager')
    return typeof manager?.installBundle === 'function' ? manager : undefined
  }

  const packageManagerOf = () => {
    const profile = ctx.get('profileContext')
    const packageManager = profile?.packageManager
    return typeof packageManager?.command === 'string' ? packageManager : undefined
  }

  const disposeProbe = server.register({
    kind: 'exact',
    path: PROBE_PATH,
    handler: async (request, response) => {
      if (request.method !== 'GET') {
        sendJson(response, 405, { ok: false, code: 'METHOD_NOT_ALLOWED' })
        return
      }
      if (!sameOrigin(request)) {
        sendJson(response, 403, { ok: false, code: 'UPDATE_FORBIDDEN' })
        return
      }
      const dir = resolveProfile()
      if (dir === undefined) {
        sendJson(response, 200, { ok: true, installed: null, latest: null, mode: 'manual', updateSupported: false, reason: 'no-profile' })
        return
      }
      const mode = installMode(dependencySpec(dir))
      const installed = installedVersion(dir)
      const latest = await fetchLatestVersion(installed)
      const supported = mode === 'npm' && installed !== undefined && (
        installerOf() !== undefined || packageManagerOf() !== undefined
      )
      sendJson(response, 200, {
        ok: true,
        profile: dir,
        installed: installed ?? null,
        latest: latest ?? null,
        mode,
        updateSupported: supported,
        reason: supported ? null : mode !== 'npm' ? 'linked-or-manual' : installed === undefined ? 'not-installed' : 'no-installer',
        checkedAt: new Date().toISOString(),
      })
    },
  })

  // No running-agent guard here, on purpose. The plugin market refuses an
  // update while any agent runs; this package is UI-only — agents never import
  // it and this host half is already in memory — so replacing its files cannot
  // disturb a working turn. Blocking a panel update behind an unrelated agent
  // run costs more than it protects. docs/architecture.md §8 records the
  // decision and the condition that would reverse it; read that before adding
  // an `agents` check.
  const disposeApply = server.register({
    kind: 'exact',
    path: APPLY_PATH,
    handler: async (request, response) => {
      if (request.method !== 'POST') {
        sendJson(response, 405, { ok: false, code: 'METHOD_NOT_ALLOWED' })
        return
      }
      if (!sameOrigin(request)) {
        sendJson(response, 403, { ok: false, code: 'UPDATE_FORBIDDEN' })
        return
      }
      if (state.promise !== undefined) {
        sendJson(response, 409, { ok: false, code: 'OPERATION_BUSY', message: 'another update is already running', retryable: true })
        return
      }
      const dir = resolveProfile()
      if (dir === undefined) {
        sendJson(response, 409, { ok: false, code: 'PLUGIN_NOT_INSTALLED', message: 'no DSH profile here to update', retryable: false })
        return
      }
      let body
      try {
        body = await readBody(request)
      } catch (error) {
        sendJson(response, 400, { ok: false, code: 'UPDATE_REJECTED', message: error instanceof Error ? error.message : String(error) })
        return
      }
      const target = body?.target
      if (!isExactVersion(target)) {
        sendJson(response, 400, { ok: false, code: 'UPDATE_REJECTED', message: 'target must be an exact version', retryable: false })
        return
      }
      // A checkout is updated by its own owner; replacing its `link:` spec with
      // a registry version would silently detach the working copy.
      const mode = installMode(dependencySpec(dir))
      if (mode !== 'npm') {
        sendJson(response, 409, {
          ok: false,
          code: 'UPDATE_REJECTED',
          message: mode === 'link'
            ? 'this profile installs the plugin from a checkout; update it there and reload'
            : 'this profile records no plugin dependency to replace',
          retryable: false,
        })
        return
      }
      const installed = installedVersion(dir)
      if (installed !== undefined && compareVersions(target, installed) < 0) {
        sendJson(response, 409, {
          ok: false,
          code: 'DOWNGRADE_DETECTED',
          message: `refusing to downgrade ${installed} to ${target}`,
          retryable: false,
        })
        return
      }
      const task = applyUpdate({
        target,
        profileDir: dir,
        installer: installerOf(),
        pluginCommand: await pluginCommandOf(ctx.get('profileContext')),
        packageManager: packageManagerOf(),
        runner: runProcess,
      })
      state.promise = task
      try {
        const result = await task
        sendJson(response, 200, { ok: true, ...result })
      } catch (error) {
        const failure = error instanceof UpdateError
          ? error
          : new UpdateError('UPDATE_FAILED', error instanceof Error ? error.message : String(error))
        sendJson(response, failure.code === 'AUTO_UPDATE_UNAVAILABLE' ? 501 : 502, {
          ok: false,
          code: failure.code,
          message: failure.message,
          retryable: failure.retryable,
          ...(failure.diagnostic === undefined ? {} : { diagnostic: failure.diagnostic }),
          ...(MANUAL_HINT_CODES.has(failure.code) ? { hint: manualCommand(dir, target) } : {}),
        })
      } finally {
        state.promise = undefined
      }
    },
  })

  return () => {
    for (const dispose of [disposeProbe, disposeApply]) {
      try {
        if (typeof dispose === 'function') dispose()
      } catch {
        // A route that already went away is not a failure to report.
      }
    }
  }
}
