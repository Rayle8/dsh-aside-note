/**
 * Where this plugin is installed, and which version is actually there.
 *
 * The update path never trusts the running module: DSH keeps the loaded build
 * in memory after the files on disk change, so "installed" always means the
 * manifest under the profile's `node_modules`. Everything here is a read.
 */
import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { isAbsolute, join, resolve } from 'node:path'

/** The package this host half updates and reports on. */
export const PACKAGE = 'dsh-aside-note'

/**
 * Parse a JSON file, or answer undefined when it is missing or malformed.
 * @param {string} path
 * @returns {any}
 */
export function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return undefined
  }
}

/**
 * The DSH home directory, as DSH itself resolves it.
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {string}
 */
export function dshHome(env = process.env) {
  const configured = typeof env.DSH_HOME === 'string' ? env.DSH_HOME.trim() : ''
  return configured === '' ? join(homedir(), '.dsh') : configured
}

/**
 * The profile directory this host runs in.
 *
 * The launcher records the profile it opened (`profileContext`); the fallback
 * follows DSH's own layout so a host without that service still behaves.
 * @param {{ dir?: unknown } | undefined} profileContext
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {string}
 */
export function profileDirOf(profileContext, env = process.env) {
  const recorded = profileContext !== null && typeof profileContext === 'object' ? profileContext.dir : undefined
  if (typeof recorded === 'string' && recorded.trim() !== '') return resolve(recorded)
  const explicit = typeof env.DSH_PROFILE_DIR === 'string' ? env.DSH_PROFILE_DIR.trim() : ''
  if (explicit !== '') return resolve(explicit)
  const name = typeof env.DSH_PROFILE === 'string' && env.DSH_PROFILE.trim() !== '' ? env.DSH_PROFILE.trim() : 'desktop'
  return join(dshHome(env), 'profiles', name)
}

/**
 * Whether a directory looks like a DSH profile.
 * @param {string} dir
 * @returns {boolean}
 */
export function isProfileDir(dir) {
  const manifest = readJson(join(dir, 'package.json'))
  return manifest !== null && typeof manifest === 'object' && typeof manifest.dsh?.profile === 'object'
}

/**
 * The version on disk for this package, read from the profile's public link
 * rather than from whatever versioned directory pnpm left behind.
 * @param {string} profileDir
 * @returns {string | undefined}
 */
export function installedVersion(profileDir) {
  const manifest = readJson(join(profileDir, 'node_modules', PACKAGE, 'package.json'))
  return typeof manifest?.version === 'string' ? manifest.version : undefined
}

/**
 * The dependency spec the profile records, which DSH restores when an install
 * fails — so it is the recorded intent, not necessarily what is on disk.
 * @param {string} profileDir
 * @returns {string | undefined}
 */
export function dependencySpec(profileDir) {
  const manifest = readJson(join(profileDir, 'package.json'))
  const spec = manifest?.dependencies?.[PACKAGE] ?? manifest?.devDependencies?.[PACKAGE]
  return typeof spec === 'string' ? spec : undefined
}

/**
 * How this profile installed the package: from the registry, from a checkout,
 * or by something this host cannot drive.
 * @param {string | undefined} spec
 * @returns {'npm' | 'link' | 'manual'}
 */
export function installMode(spec) {
  if (spec === undefined) return 'manual'
  if (/^(?:link|file|workspace):/.test(spec) || /^\.{1,2}(?:[/\\]|$)/.test(spec)) return 'link'
  return isAbsolute(spec) ? 'link' : 'npm'
}
