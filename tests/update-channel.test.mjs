/**
 * Prerelease channels: a beta build has to see the next beta, and a stable
 * build must never see one.
 *
 * Every prerelease is published to the `next` dist-tag (`latest` never carries
 * one), so the probe reads a second tag only when the running build is itself a
 * prerelease. These tests pin both halves: the extra read, and its absence.
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { compareVersions as hostCompare, isPrerelease as hostIsPrerelease } from '../host/versions.js'
import { selectReleaseHistory } from '../src/client/update/releaseHistory.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** The probe and comparator as shipped, evaluated from the built bundle. */
function readUpdateHelpers() {
  const bundle = fs.readFileSync(path.join(root, 'client', 'client.js'), 'utf8')
  const repoLine = bundle.match(/const PLUGIN_REPO_URL = "[^"]+";/)[0]
  const start = bundle.indexOf('const UPDATE_REGISTRY_HOSTS = ')
  const end = bundle.indexOf('const updateProbe = createUpdateProbe', start)
  assert.ok(start > 0 && end > start, 'update helpers not found in the bundle')
  return new Function(`${repoLine}\n${bundle.slice(start, end)}\nreturn { createUpdateProbe, isNewerVersion, isPrereleaseVersion, isPublishedChannel }`)()
}

const json = version => ({ ok: true, json: async () => ({ version }) })

test('a stable build reads `latest` alone', async () => {
  const { createUpdateProbe } = readUpdateHelpers()
  const calls = []
  const probe = createUpdateProbe({
    fetchImpl: async url => {
      calls.push(url)
      return json('1.1.2')
    },
    now: () => 0,
    currentVersion: '1.1.1',
  })
  assert.equal(await probe.latest(), '1.1.2')
  assert.deepEqual(calls, ['https://registry.npmjs.org/dsh-aside-note/latest'])
  assert.equal(calls.some(url => url.endsWith('/next')), false, 'a stable build never asks for a prerelease')
})

test('a prerelease build reads `next` and takes the newer beta', async () => {
  const { createUpdateProbe, isNewerVersion } = readUpdateHelpers()
  const calls = []
  const probe = createUpdateProbe({
    fetchImpl: async url => {
      calls.push(url)
      return json(url.endsWith('/next') ? '1.2.0-beta.2' : '1.1.1')
    },
    now: () => 0,
    currentVersion: '1.2.0-beta.1',
  })
  assert.equal(await probe.latest(), '1.2.0-beta.2')
  assert.deepEqual(calls, [
    'https://registry.npmjs.org/dsh-aside-note/latest',
    'https://registry.npmjs.org/dsh-aside-note/next',
  ])
  assert.equal(isNewerVersion('1.2.0-beta.2', '1.2.0-beta.1'), true)
})

test('a stable release on `latest` still outranks the running beta', async () => {
  const { createUpdateProbe } = readUpdateHelpers()
  const probe = createUpdateProbe({
    fetchImpl: async url => json(url.endsWith('/next') ? '1.2.0-beta.2' : '1.2.0'),
    now: () => 0,
    currentVersion: '1.2.0-beta.1',
  })
  assert.equal(await probe.latest(), '1.2.0', 'the promoted release is the update to offer')
})

test('a release accidentally tagged `next` is not offered as a beta', async () => {
  const { createUpdateProbe } = readUpdateHelpers()
  const probe = createUpdateProbe({
    fetchImpl: async url => json(url.endsWith('/next') ? '3.0.0' : '1.1.1'),
    now: () => 0,
    currentVersion: '1.2.0-beta.1',
  })
  assert.equal(await probe.latest(), '1.1.1', '`next` is prerelease-only by contract')
})

test('prerelease identifiers order as semver does', () => {
  const { isNewerVersion } = readUpdateHelpers()
  assert.equal(isNewerVersion('1.2.0-beta.2', '1.2.0-beta.1'), true)
  assert.equal(isNewerVersion('1.2.0-beta.10', '1.2.0-beta.9'), true, 'numeric identifiers compare as numbers')
  assert.equal(isNewerVersion('1.2.0', '1.2.0-beta.2'), true, 'a release outranks its prereleases')
  assert.equal(isNewerVersion('1.2.0-beta.2', '1.2.0'), false)
  assert.equal(isNewerVersion('1.2.0-alpha.1', '1.2.0-beta.1'), false, 'alphanumerics order lexically: alpha < beta')
  assert.equal(isNewerVersion('1.2.0-rc.1', '1.2.0-beta.1'), true, 'rc > beta')
  assert.equal(isNewerVersion('1.2.0-beta.1', '1.2.0-beta.1'), false)
})

test('only a published channel checks for updates on open', () => {
  const { isPublishedChannel } = readUpdateHelpers()
  // A tester installed a beta on purpose: it has to see the next one.
  assert.equal(isPublishedChannel('1.1.2-beta.1'), true)
  assert.equal(isPublishedChannel('1.2.0-rc.1'), true)
  assert.equal(isPublishedChannel('1.2.0-alpha.3'), true)
  // A local or dirty build must stay quiet.
  assert.equal(isPublishedChannel('2.1.0-dev'), false)
  assert.equal(isPublishedChannel('1.1.1'), false)
})

test('the host and browser comparators agree', () => {
  const { isNewerVersion } = readUpdateHelpers()
  const table = [
    ['1.2.0-beta.2', '1.2.0-beta.1'],
    ['1.2.0-beta.10', '1.2.0-beta.9'],
    ['1.2.0', '1.2.0-beta.2'],
    ['1.2.0-beta.2', '1.2.0'],
    ['1.1.2', '1.1.1'],
    ['1.10.0', '1.9.0'],
    ['not-a-version', '1.0.0'],
    ['1.0.0', 'not-a-version'],
  ]
  for (const [left, right] of table) {
    assert.equal(isNewerVersion(left, right), hostCompare(left, right) > 0, `${left} > ${right} disagrees with the host`)
  }
  assert.equal(hostIsPrerelease('1.2.0-beta.1'), true)
  assert.equal(hostIsPrerelease('1.2.0'), false)
})

test('a prerelease build reads the notes of the beta it is being offered', () => {
  const feed = [
    { version: '1.2.0-beta.2', prerelease: true, body: 'second beta' },
    { version: '1.2.0-beta.1', prerelease: true, body: 'first beta' },
  ]
  const onBeta = selectReleaseHistory(feed, { current: '1.2.0-beta.1', latest: '1.2.0-beta.2' })
  assert.equal(onBeta.entries.length, 1)
  assert.equal(onBeta.entries[0].version, '1.2.0-beta.2')

  // A stable build keeps its previous behaviour: neither prerelease is notes.
  const onStable = selectReleaseHistory(feed, { current: '1.1.1', latest: '1.2.0-beta.2' })
  assert.equal(onStable.entries.length, 0)
})
