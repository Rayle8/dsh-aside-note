/** Segmented switch between the workspace list and the session list. */
import React from 'react'

const h = React.createElement

export function ScopeSwitch(props) {
  const { say, mode, onChange } = props
  const options = [
    { value: 'workspace', label: say('scope.workspace') },
    { value: 'session', label: say('scope.session') },
  ]
  return h(
    'div',
    { className: 'dsh-an-scope', role: 'group', 'aria-label': say('scope.label') },
    options.map(option => h(
      'button',
      {
        key: option.value,
        type: 'button',
        className: 'dsh-an-scopeBtn',
        'data-scope-mode': option.value,
        'data-active': mode === option.value ? 'true' : undefined,
        'aria-pressed': mode === option.value,
        onClick: () => onChange(option.value),
      },
      option.label,
    )),
  )
}
