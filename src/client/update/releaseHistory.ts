/**
 * Which published releases belong in the update card.
 *
 * A user can sit several versions behind, so the card lists every release
 * between the running build and the published one instead of only the newest —
 * a 2.0.0 install upgrading to 2.3.0 should see 2.1.0, 2.2.0 and 2.3.0, newest
 * first. The list comes from GitHub's releases feed; drafts and prereleases are
 * skipped because stable users are never offered them.
 *
 * Pure and dependency free so the selection rules can be tested directly.
 */

/** One release as the panel needs it. */
export interface ReleaseEntry {
  version: string
  body: string
  url: string
  publishedAt: string
}

/** The releases to show, plus whether older ones were cut off. */
export interface ReleaseHistory {
  entries: ReleaseEntry[]
  truncated: boolean
}

/** Enough history to explain a long gap without turning the card into a feed. */
export const MAX_RELEASE_HISTORY = 6

export interface ReleaseHistoryQuery {
  current: string
  latest: string
  max?: number
}

function core(version: string): number[] {
  return String(version ?? '')
    .replace(/^v/i, '')
    .split('-', 1)[0]
    .split('.')
    .map(part => Number.parseInt(part, 10) || 0)
}

/** A version carrying a prerelease part, e.g. `1.2.0-beta.1`. */
export function isPrerelease(version: string): boolean {
  return /^\D*\d+\.\d+\.\d+-/.test(String(version ?? '').trim())
}

/**
 * Full ordering of two versions, prerelease identifiers included.
 *
 * A beta build asks for the notes between `1.2.0-beta.1` and `1.2.0-beta.2`;
 * comparing the cores alone would call those equal and leave the card with no
 * notes at all, which is exactly the case a beta test needs to read.
 */
export function compareVersions(a: string, b: string): number {
  const left = core(a)
  const right = core(b)
  for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
    const difference = (left[index] || 0) - (right[index] || 0)
    if (difference !== 0) return difference > 0 ? 1 : -1
  }
  const leftPre = prerelease(a)
  const rightPre = prerelease(b)
  if (leftPre.length === 0 && rightPre.length === 0) return 0
  if (leftPre.length === 0) return 1
  if (rightPre.length === 0) return -1
  for (let index = 0; index < Math.max(leftPre.length, rightPre.length); index += 1) {
    const x = leftPre[index]
    const y = rightPre[index]
    if (x === undefined) return -1
    if (y === undefined) return 1
    if (x === y) continue
    const xNumeric = /^\d+$/.test(x)
    const yNumeric = /^\d+$/.test(y)
    if (xNumeric && yNumeric) return Number(x) > Number(y) ? 1 : -1
    if (xNumeric) return -1
    if (yNumeric) return 1
    return x > y ? 1 : -1
  }
  return 0
}

/** The prerelease identifiers of a version, or an empty list. */
function prerelease(version: string): string[] {
  const normalized = String(version ?? '').trim().replace(/^v/i, '')
  const dash = normalized.indexOf('-')
  if (dash === -1) return []
  const tail = normalized.slice(dash + 1).split('+')[0]
  return tail === '' ? [] : tail.split('.')
}

/** A `x.y.z` or `x.y.z-prerelease` tag, with the `v` prefix and whitespace removed. */
export function normalizeVersion(version: string): string {
  const normalized = String(version ?? '').trim().replace(/^v/i, '')
  return /^\d+(\.\d+)*(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(normalized) ? normalized : ''
}

/**
 * Filter the feed down to the releases the user is about to receive:
 * newer than `current`, not newer than `latest`, newest first, capped.
 */
export function selectReleaseHistory(list: unknown, query: ReleaseHistoryQuery): ReleaseHistory {
  const max = query.max && query.max > 0 ? query.max : MAX_RELEASE_HISTORY
  const seen = new Set<string>()
  const entries: ReleaseEntry[] = []

  // Stable users are never offered a prerelease, so its notes stay hidden too.
  // A prerelease build is on that channel already and needs the same notes.
  const allowPrerelease = isPrerelease(query.current)

  for (const item of Array.isArray(list) ? list : []) {
    const release = item as Record<string, any> | null
    if (!release || typeof release !== 'object') continue
    if (release.draft === true) continue
    if (release.prerelease === true && !allowPrerelease) continue
    const version = normalizeVersion(typeof release.version === 'string' ? release.version : release.tag_name)
    if (!version || seen.has(version)) continue
    if (compareVersions(version, query.current) <= 0) continue
    if (query.latest && compareVersions(version, query.latest) > 0) continue
    seen.add(version)
    const url = release.url ?? release.html_url
    const publishedAt = release.publishedAt ?? release.published_at
    entries.push({
      version,
      body: typeof release.body === 'string' ? release.body : '',
      url: typeof url === 'string' ? url : '',
      publishedAt: typeof publishedAt === 'string' ? publishedAt : '',
    })
  }

  entries.sort((a, b) => compareVersions(b.version, a.version))
  return {
    entries: entries.slice(0, max),
    truncated: entries.length > max,
  }
}
