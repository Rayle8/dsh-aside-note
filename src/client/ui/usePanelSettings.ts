/** Inline settings: send shortcut and the forward lead-in, both persisted. */
import React from 'react'
import {
  readAnalyticsEnabled,
  readForwardPrefix,
  readSendShortcut,
  writeAnalyticsEnabled,
  writeForwardPrefix,
  writeSendShortcut,
} from '../storage/prefs'
import { setAnalyticsEnabled as setAnalyticsReporting } from '../rum'

export function usePanelSettings() {
  const [showSettings, setShowSettings] = React.useState(false)
  const [sendShortcut, setSendShortcut] = React.useState(readSendShortcut)
  const [forwardPrefix, setForwardPrefix] = React.useState(readForwardPrefix)
  const [analyticsEnabled, setAnalyticsEnabled] = React.useState(readAnalyticsEnabled)
  const prefixRef = React.useRef(null)

  // The prefix field starts one line tall and grows with wrapped content up to
  // a six-line cap, then scrolls. Re-measure whenever the value changes or the
  // card remounts.
  React.useLayoutEffect(() => {
    const node = prefixRef.current
    if (!node) return
    node.style.height = 'auto'
    node.style.height = `${Math.min(138, node.scrollHeight + 2)}px`
  }, [forwardPrefix, showSettings])

  const chooseShortcut = value => {
    setSendShortcut(value)
    writeSendShortcut(value)
  }

  // The opt-out switch: persist the choice, then let the RUM gate send the
  // final event (or start the SDK again) in the same click.
  const toggleAnalytics = (next: boolean) => {
    setAnalyticsEnabled(next)
    writeAnalyticsEnabled(next)
    setAnalyticsReporting(next)
  }

  const changeForwardPrefix = value => {
    const next = String(value || '').slice(0, 80)
    setForwardPrefix(next)
    writeForwardPrefix(next)
  }

  return {
    showSettings,
    setShowSettings,
    sendShortcut,
    chooseShortcut,
    forwardPrefix,
    changeForwardPrefix,
    prefixRef,
    analyticsEnabled,
    toggleAnalytics,
  }
}
