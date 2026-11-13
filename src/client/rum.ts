/**
 * Anonymous product analytics for the panel, reported to Tencent Cloud RUM.
 *
 * The appId is a browser-side project id, not a secret: it names the RUM
 * project in every report. It is compiled in rather than read from a build-time
 * env file, because `client/client.js` is a committed artifact and a local env
 * file made CI rebuild a different byte stream than the one under review.
 *
 * The panel lives inside the shell's window, so the SDK's automatic collectors
 * would measure the shell rather than the panel: page performance, web vitals,
 * global JS errors, API and asset speed are all off. Only `reportEvent` calls
 * from the UI modules are sent, and they carry the scope kind and a count —
 * never note text, session ids or prompt content.
 */
import Aegis from 'aegis-web-sdk'
import { ANONYMOUS_UIN_KEY } from './constants'

/** RUM application id, shown in the console; safe to ship in a browser bundle. */
const APP_ID = 'EPoknFrdnK4Z16YRlz'

/** The SDK only accepts this shape for `uin`. */
const UIN_PATTERN = /^[@=.0-9a-zA-Z_-]{1,60}$/

function randomUin() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `anon-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

/**
 * One anonymous visitor id per browser, kept in localStorage so the RUM
 * console can count UV and stitch a session across reloads. It carries no
 * account, device or content information, and clearing site data rotates it.
 */
function anonymousUin() {
  try {
    const ls = window.localStorage
    const saved = ls.getItem(ANONYMOUS_UIN_KEY)
    if (saved && UIN_PATTERN.test(saved)) return saved
    const created = randomUin()
    ls.setItem(ANONYMOUS_UIN_KEY, created)
    return created
  } catch {
    // Storage blocked: fall back to a per-load id rather than failing the boot.
    return randomUin()
  }
}

/**
 * Tests boot the bundle in jsdom, where an initialized SDK would report to the
 * real project. The realm identifies itself in the user agent, which is the
 * only signal available before any layout exists.
 */
const inTestRealm = typeof navigator !== 'undefined' && /\bjsdom\b/i.test(navigator.userAgent)

/** Aegis has no native DNT switch; `beforeReport` returning false drops a report. */
function doNotTrack(): boolean {
  const nav = navigator as Navigator & { msDoNotTrack?: string }
  return nav.doNotTrack === '1' || nav.msDoNotTrack === '1'
}

const rum = inTestRealm
  ? null
  : new Aegis({
      id: APP_ID,
      uin: anonymousUin(),
      // Pinned to the console's guide; the SDK default is the same host, but an
      // explicit value keeps a future default change from moving our traffic.
      hostUrl: 'https://rumt-zh.com',
      // Lets the RUM console split reports by plugin release.
      version: __PLUGIN_VERSION__,
      pagePerformance: false,
      webVitals: false,
      onError: false,
      reportApiSpeed: false,
      reportAssetSpeed: false,
      // The shell owns routing; the plugin has no pages of its own.
      spa: false,
      // The shell's URL can carry a workspace or session id, so reports carry a
      // constant page name instead of location.href.
      pageUrl: 'dsh-aside-note',
      beforeReport: () => !doNotTrack(),
    })

/** `ext1`–`ext3` are the SDK's custom dimensions, rendered as columns in RUM. */
type EventFields = { ext1?: string; ext2?: string }

export function reportEvent(name: string, fields: EventFields = {}) {
  rum?.reportEvent({ name, ...fields })
}
