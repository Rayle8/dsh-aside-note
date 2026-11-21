/**
 * Plugin identity, storage keys, limits and platform helpers.
 *
 * Everything whose value is part of the on-disk contract lives here; the
 * storage modules and the panel import it instead of repeating literals.
 */
/** Locale namespace of this plugin's copy (also binds the renderer's `t` prop). */
export const NS = 'dsh-aside-note'
/** Sidebar launcher id and the main panel key it addresses. */
export const PANEL_ID = 'dsh-aside-note'
/** Session-scoped memo store used by the popover and the session-header entry. */
export const SESSION_STORAGE_KEY = 'dsh.aside-note'
/** Notes shared by every session of one workspace; kept beside the session key. */
export const WORKSPACE_STORAGE_KEY = 'dsh.aside-note.workspaces'
/** Unsaved add/edit drafts, restored when the panel is reopened. */
export const DRAFT_STORAGE_KEY = 'dsh.aside-note.drafts'
/** Notes already forwarded to the composer, per session; marks the forward button. */
export const FORWARDED_STORAGE_KEY = 'dsh.aside-note.forwarded'
/** Anonymous RUM visitor id; fills the SDK's `uin` so UV survives reloads. */
export const ANONYMOUS_UIN_KEY = 'dsh.aside-note.uin'
/** Opt-out switch for anonymous usage events; stored as "off" when disabled. */
export const ANALYTICS_ENABLED_KEY = 'dsh.aside-note.analytics'
/** Whether this browser has opened the panel before; reported once as `first`. */
export const PANEL_OPENED_KEY = 'dsh.aside-note.panel-opened'
/** Shown in the in-panel settings; keep in sync with package.json. */
export const PLUGIN_VERSION = '1.2.1'
export const PLUGIN_AUTHOR = '阿三石'
export const PLUGIN_REPO_URL = 'https://github.com/Rayle8/dsh-aside-note'
export const PLUGIN_REPO_LABEL = 'github.com/Rayle8/dsh-aside-note'
/** Send preference; persisted across panel openings. Enter sends by default. */
export const SEND_SHORTCUT_KEY = 'dsh.aside-note.send-shortcut'
/** Lead-in written before a forwarded note; absent means the localized default, empty means no prefix. */
export const FORWARD_PREFIX_STORAGE_KEY = 'dsh.aside-note.forward-prefix'
export const SEND_SHORTCUT_DEFAULT = 'enter'
/** macOS names the command modifier with a symbol; other platforms say Ctrl. */
export const IS_MAC = (() => {
  try {
    const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || ''
    return /mac/i.test(String(platform))
  } catch {
    return false
  }
})()
export const MOD_LABEL = IS_MAC ? '⌘' : 'Ctrl'

/** Whether the key event carries this platform's command modifier. */
export function isSendModifier(event) {
  return IS_MAC ? event.metaKey === true : event.ctrlKey === true
}
/** Last chosen list scope: the workspace list or the session list. */
export const SCOPE_MODE_KEY = 'dsh.aside-note.scope-mode'
export const SCOPE_MODE_DEFAULT = 'workspace'
/** Remembered expand/collapse state of the open/completed sections. */
export const SECTION_STATE_KEY = 'dsh.aside-note.sections'
export const SECTION_STATE_DEFAULT = { open: true, done: false }
/** How long the inline clear-completed confirmation waits before it dismisses itself. */
export const CLEAR_CONFIRM_MS = 5000
/** Persisted width of the experimental right-side panel. */
export const PANEL_WIDTH_KEY = 'dsh.aside-note.panel-width'
export const PANEL_DEFAULT_WIDTH = 360
export const PANEL_MIN_WIDTH = 280
export const PANEL_MAX_WIDTH = 720
/** Persisted height of the experimental right-side panel; 0 means content-sized. */
export const PANEL_HEIGHT_KEY = 'dsh.aside-note.panel-height'
export const PANEL_MIN_HEIGHT = 240
/** A note is meant to stay brief; this is the hard cap. */
export const MAX_TEXT = 280
/** Same-origin host endpoint owned by this package (keep in sync with host/store-route.js). */
export const HOST_STORE_PATH = '/dsh-aside-note/store'
/** Absolute path of the host file, for Settings. */
export const HOST_STORE_LOCATION_PATH = '/dsh-aside-note/store/location'
/** Ask the host to reveal the store file in its file manager. */
export const HOST_STORE_REVEAL_PATH = '/dsh-aside-note/store/reveal'
/** Browser-side marker: written only after the one-way switch to host storage succeeded. */
export const STORAGE_MODE_KEY = 'dsh.aside-note.storage-mode'
/** Browser-side notice dedupe record: { code, at }. */
export const STORAGE_NOTICE_KEY = 'dsh.aside-note.storage-notice'
/** Hydration/notice dedupe window for repeated failures. */
export const STORAGE_NOTICE_MS = 24 * 60 * 60 * 1000
/** A snapshot is small; anything slower than this is a broken host, not a busy disk. */
export const HOST_READ_TIMEOUT_MS = 4000
/** A durable write includes fsync; allow a slow disk but never hang the panel. */
export const HOST_WRITE_TIMEOUT_MS = 10000
