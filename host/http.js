/** Shared HTTP helpers for the plugin's host routes. */

/**
 * @param {import('node:http').ServerResponse} response
 * @param {number} status
 * @param {unknown} body
 */
export function sendJson(response, status, body) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  response.end(JSON.stringify(body))
}

/**
 * Reject requests a page other than this host's could have made.
 * @param {import('node:http').IncomingMessage} request
 * @returns {boolean}
 */
export function sameOrigin(request) {
  if (request.headers['sec-fetch-site'] === 'cross-site') return false
  const origin = request.headers.origin
  if (origin === undefined) return true
  try {
    return new URL(origin).host === request.headers.host
  } catch {
    return false
  }
}

/** A request body that cannot be accepted; `code` is the route's discriminant. */
export class BodyError extends Error {
  /**
   * @param {'BODY_TOO_LARGE' | 'BAD_JSON'} code
   * @param {string} message
   */
  constructor(code, message) {
    super(message)
    this.name = 'BodyError'
    this.code = code
  }
}

/**
 * Read and parse one JSON body with a byte ceiling.
 * @param {import('node:http').IncomingMessage} request
 * @param {number} limit
 * @returns {Promise<any>}
 */
export async function readJsonBody(request, limit) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buffer.length
    if (size > limit) throw new BodyError('BODY_TOO_LARGE', 'request body too large')
    chunks.push(buffer)
  }
  if (chunks.length === 0) return {}
  const body = Buffer.concat(chunks).toString('utf8')
  try {
    return JSON.parse(body)
  } catch {
    throw new BodyError('BAD_JSON', 'invalid JSON body')
  }
}
