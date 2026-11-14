/**
 * The host update path, exercised without a host.
 *
 * The ordering is the contract: DSH's installer first, its `dsh plugin add`
 * only when the installer refuses because the package is already there, and the
 * profile's package manager only when neither is available. The other half of
 * the contract is that every route proves what landed — a package manager that
 * exits 0 while leaving the old build in place is a failure, not a success.
 */
import assert from 'node:assert/strict'
import test from 'node:test'

import { UpdateError, applyUpdate, manualCommand } from '../host/apply-update.js'
import { compareVersions, isExactVersion, isNewer } from '../host/versions.js'

const PROFILE = 'C:/profile'
const TARGET = '1.1.2'

/** @param {string | undefined} version */
function stubVersion(version) {
  return () => version
}

/**
 * A profile whose disk version changes when the install step succeeds — the
 * first read is the previous version, the read after the step is the proof.
 * @param {string} before
 * @param {string} after
 */
function staging(before, after) {
  let current = before
  return {
    readVersion: () => current,
    installed: () => {
      current = after
    },
  }
}

test('versions order numerically and prereleases last', () => {
  assert.equal(compareVersions('1.10.0', '1.9.0'), 1)
  assert.equal(compareVersions('1.2.0', '1.2.0-rc.1'), 1)
  assert.equal(compareVersions('1.2.0-rc.1', '1.2.0-rc.2'), -1)
  assert.equal(compareVersions('v1.2.0', '1.2.0'), 0)
  assert.equal(isNewer('1.1.2', '1.1.1'), true)
  assert.equal(isNewer('1.1.1', '1.1.1'), false)
  // A malformed registry answer must never read as newer.
  assert.equal(isNewer('not-a-version', '1.1.1'), false)
})

test('only an exact version is accepted as an install target', () => {
  assert.equal(isExactVersion('1.1.2'), true)
  assert.equal(isExactVersion('1.1.2-rc.1'), true)
  assert.equal(isExactVersion('^1.1.2'), false)
  assert.equal(isExactVersion('link:../x'), false)
  assert.equal(isExactVersion('1.1.2 && rm -rf /'), false)
})

test('the installer is used first and its result is verified', async () => {
  const calls = []
  const disk = staging('1.1.1', TARGET)
  const result = await applyUpdate({
    target: TARGET,
    profileDir: PROFILE,
    installer: {
      installBundle: async (spec, options) => {
        calls.push({ spec, options })
        disk.installed()
        return { application: 'applied' }
      },
    },
    readVersion: disk.readVersion,
  })
  assert.deepEqual(calls, [{ spec: 'dsh-aside-note@1.1.2', options: { enabled: false } }])
  assert.equal(result.route, 'dsh')
  assert.equal(result.updated, true)
  // DSH keeps the loaded build until it restarts.
  assert.equal(result.restartRequired, true)
  assert.equal(result.installedVersion, TARGET)
})

test('already-installed falls through to the plugin command', async () => {
  const commands = []
  const disk = staging('1.1.1', TARGET)
  const result = await applyUpdate({
    target: TARGET,
    profileDir: PROFILE,
    installer: {
      installBundle: async () => ({ application: 'failed', error: { code: 'already-installed' } }),
    },
    pluginCommand: async args => {
      commands.push(args)
      disk.installed()
      return { exitCode: 0, output: '+ dsh-aside-note 1.1.2' }
    },
    readVersion: disk.readVersion,
  })
  assert.deepEqual(commands, [['add', 'dsh-aside-note@1.1.2', '--save-exact']])
  assert.equal(result.route, 'dsh-plugin')
  assert.equal(result.updated, true)
})

test('a refusal other than already-installed does not try the next step', async () => {
  let commanded = false
  await assert.rejects(
    applyUpdate({
      target: TARGET,
      profileDir: PROFILE,
      installer: {
        installBundle: async () => ({ application: 'failed', error: { code: 'bundle-in-use' } }),
      },
      pluginCommand: async () => {
        commanded = true
        return { exitCode: 0 }
      },
      readVersion: stubVersion('1.1.1'),
    }),
    (error) => {
      assert.ok(error instanceof UpdateError)
      assert.equal(error.code, 'bundle-in-use')
      assert.equal(error.retryable, true)
      return true
    },
  )
  assert.equal(commanded, false)
})

test('the profile package manager is the last automatic route', async () => {
  const spawned = []
  const disk = staging('1.1.1', TARGET)
  const result = await applyUpdate({
    target: TARGET,
    profileDir: PROFILE,
    packageManager: { command: 'node', args: ['pnpm.mjs'] },
    runner: async (command, args, options) => {
      spawned.push({ command, args, cwd: options.cwd })
      disk.installed()
      return { exitCode: 0, stdout: 'done', stderr: '' }
    },
    readVersion: disk.readVersion,
  })
  assert.equal(result.route, 'package-manager')
  assert.deepEqual(spawned, [{
    command: 'node',
    args: ['pnpm.mjs', 'add', 'dsh-aside-note@1.1.2', '--save-exact'],
    cwd: PROFILE,
  }])
})

test('a package manager that leaves the old build is a failure', async () => {
  await assert.rejects(
    applyUpdate({
      target: TARGET,
      profileDir: PROFILE,
      packageManager: { command: 'pnpm' },
      runner: async () => ({ exitCode: 0, stdout: '', stderr: '' }),
      // pnpm exited 0 but the profile still resolves the old version: the
      // fresh-release hold or a lagging mirror substituted it.
      readVersion: stubVersion('1.1.1'),
    }),
    (error) => {
      assert.equal(error.code, 'RESOLVED_VERSION_MISMATCH')
      assert.equal(error.retryable, true)
      return true
    },
  )
})

test('the plugin command reports its own failure line', async () => {
  await assert.rejects(
    applyUpdate({
      target: TARGET,
      profileDir: PROFILE,
      pluginCommand: async () => ({
        exitCode: 1,
        output: 'WARN retry\n ERR_PNPM_META_FETCH_FAIL  GET https://registry.npmjs.org/',
      }),
      readVersion: stubVersion('1.1.1'),
    }),
    (error) => {
      assert.equal(error.code, 'UPDATE_FAILED')
      assert.match(error.message, /ERR_PNPM_META_FETCH_FAIL/)
      return true
    },
  )
})

test('an incompatible install is named as such', async () => {
  await assert.rejects(
    applyUpdate({
      target: TARGET,
      profileDir: PROFILE,
      pluginCommand: async () => ({ exitCode: 1, output: 'needs dsh ^0.3.0', incompatible: [{ runtimeVersion: '0.2.2' }] }),
      readVersion: stubVersion('1.1.1'),
    }),
    (error) => {
      assert.equal(error.code, 'incompatible-version')
      return true
    },
  )
})

test('already at the target installs nothing', async () => {
  const result = await applyUpdate({
    target: TARGET,
    profileDir: PROFILE,
    installer: { installBundle: async () => { throw new Error('must not run') } },
    readVersion: stubVersion(TARGET),
  })
  assert.equal(result.updated, false)
  assert.equal(result.route, 'none')
  assert.equal(result.restartRequired, false)
})

test('no route at all says so and hands over the command', async () => {
  await assert.rejects(
    applyUpdate({ target: TARGET, profileDir: PROFILE, readVersion: stubVersion('1.1.1') }),
    (error) => {
      assert.equal(error.code, 'AUTO_UPDATE_UNAVAILABLE')
      assert.equal(error.retryable, false)
      assert.equal(error.diagnostic, manualCommand(PROFILE, TARGET))
      assert.match(error.diagnostic, /^npx -y dsh-aside-note install --version 1\.1\.2 --profile-dir /)
      return true
    },
  )
})

test('the manual command pins a prerelease to npmjs', () => {
  const command = manualCommand(PROFILE, '1.1.2-beta.7')
  assert.match(command, /^npx -y --registry=https:\/\/registry\.npmjs\.org\/ dsh-aside-note@1\.1\.2-beta\.7 install --version 1\.1\.2-beta\.7 --profile-dir /)
})

test('a non-version target is rejected before anything runs', async () => {
  await assert.rejects(
    applyUpdate({ target: 'link:../elsewhere', profileDir: PROFILE, readVersion: stubVersion('1.1.1') }),
    (error) => {
      assert.equal(error.code, 'UPDATE_REJECTED')
      return true
    },
  )
})
