/**
 * Spawn one process and collect bounded output.
 *
 * The update runs a package manager, which can be slow and noisy; output is
 * capped so a pathological log cannot grow the host's memory, and a deadline
 * ends the wait rather than holding the request forever.
 */
import { spawn } from 'node:child_process'

/** Output kept per stream; enough for the error line, not for a full log. */
const MAX_OUTPUT_BYTES = 16 * 1024

/**
 * @param {string} command
 * @param {readonly string[]} args
 * @param {{ cwd: string, env?: Record<string, string>, timeoutMs?: number }} options
 * @returns {Promise<{ exitCode: number | null, stdout: string, stderr: string, timedOut: boolean }>}
 */
export function runProcess(command, args, options) {
  const timeoutMs = options.timeoutMs ?? 10 * 60_000
  return new Promise(resolve => {
    /** @type {string[]} */
    const stdout = []
    /** @type {string[]} */
    const stderr = []
    let stdoutBytes = 0
    let stderrBytes = 0
    let timedOut = false
    let child
    try {
      child = spawn(command, args, {
        cwd: options.cwd,
        env: { ...process.env, ...(options.env ?? {}) },
        // A Windows `.cmd` shim is not an executable Node can start directly.
        shell: process.platform === 'win32' && /\.(?:cmd|bat)$/iu.test(command),
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe'],
      })
    } catch (error) {
      resolve({ exitCode: null, stdout: '', stderr: error instanceof Error ? error.message : String(error), timedOut: false })
      return
    }
    const timer = setTimeout(() => {
      timedOut = true
      child.kill()
    }, timeoutMs)
    child.stdout?.on('data', chunk => {
      if (stdoutBytes >= MAX_OUTPUT_BYTES) return
      const text = String(chunk)
      stdoutBytes += text.length
      stdout.push(text.slice(0, MAX_OUTPUT_BYTES))
    })
    child.stderr?.on('data', chunk => {
      if (stderrBytes >= MAX_OUTPUT_BYTES) return
      const text = String(chunk)
      stderrBytes += text.length
      stderr.push(text.slice(0, MAX_OUTPUT_BYTES))
    })
    child.on('error', error => {
      clearTimeout(timer)
      resolve({ exitCode: null, stdout: stdout.join(''), stderr: `${stderr.join('')}${error.message}`, timedOut })
    })
    child.on('close', code => {
      clearTimeout(timer)
      resolve({ exitCode: code, stdout: stdout.join(''), stderr: stderr.join(''), timedOut })
    })
  })
}
