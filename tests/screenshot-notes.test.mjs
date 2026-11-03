/**
 * The demo notes live in two places: `NOTES` in tools/screenshots/lib/notes.mjs
 * drives the capture, and the table in docs/screenshot-sop.md documents it for
 * whoever reruns the flow. Keep them in lockstep so a copy edit cannot silently
 * ship screenshots whose text no longer matches the SOP.
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { NOTES } from '../tools/screenshots/lib/notes.mjs'

const sop = readFileSync(new URL('../docs/screenshot-sop.md', import.meta.url), 'utf8')

/** Rows of the first markdown table whose header starts with 便笺. */
function sopNotes() {
  const lines = sop.split(/\r?\n/)
  const start = lines.findIndex(line => /^\s*\|\s*便笺\s*\|/.test(line))
  assert.notEqual(start, -1, 'docs/screenshot-sop.md no longer documents a 便笺 table')
  const rows = []
  for (const line of lines.slice(start + 1)) {
    if (!line.trim().startsWith('|')) break
    const cells = line.split('|').slice(1, -1).map(cell => cell.trim())
    if (cells.length < 3) continue
    if (cells.every(cell => /^:?-{3,}:?$/.test(cell))) continue
    rows.push({ text: cells[0], state: cells[1], when: cells[2] })
  }
  return rows
}

/** Same wording the panel uses for the anchored ages. */
function ago(ms) {
  const minutes = Math.round(ms / 60000)
  if (minutes < 60) return `${minutes} 分钟前`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} 小时前`
  return `${Math.round(hours / 24)} 天前`
}

function stamp(note) {
  const created = ago(note.age)
  if (!note.done) return created
  return `${created}创建，${ago(note.doneAge ?? note.age)}完成`
}

test('the SOP note table lists exactly the notes the capture types in', () => {
  const rows = sopNotes()
  assert.deepEqual(rows.map(row => row.text), NOTES.map(note => note.text))
  assert.deepEqual(rows.map(row => row.state), NOTES.map(note => (note.done ? '已完成' : '未完成')))
  assert.equal(new Set(NOTES.map(note => note.text)).size, NOTES.length, 'note texts must stay unique')
})

test('the SOP note ages match the anchored ages', () => {
  const rows = sopNotes()
  assert.deepEqual(rows.map(row => row.when), NOTES.map(stamp))
})
