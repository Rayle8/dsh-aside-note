/**
 * Host half of the AsideNote panel.
 *
 * Notes stay in the browser: they are small, human-authored records scoped to
 * one session or workspace. What lives here is only what a page cannot do —
 * installing a newer build of this same plugin into the profile, which used to
 * be delegated to the plugin market and was refused there whenever the panel
 * was open (`bundle-in-use`). The routes carry no note data and read no store.
 */
import { registerUpdateRoutes } from './host/route.js'

/**
 * @param {import('@deepseek-ai/cordis').Context} ctx
 * @param {{ updateEnabled?: boolean } | undefined} config
 */
export function apply(ctx, config) {
  // Headless and ACP hosts compose no web server. The panel then keeps its
  // previous market path, so a missing service is not an error worth raising.
  if (config?.updateEnabled === false) return
  ctx.inject(['webServer'], hostCtx => {
    hostCtx.effect(() => {
      const dispose = registerUpdateRoutes(hostCtx.webServer, { ctx, config })
      return () => {
        if (typeof dispose === 'function') dispose()
      }
    }, 'dsh-aside-note: update routes')
  })
}
