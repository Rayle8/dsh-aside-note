import { NS } from '../constants'
import { de } from './de'
import { en } from './en'
import { es } from './es'
import { fr } from './fr'
import { ja } from './ja'
import { pt } from './pt'
import { ru } from './ru'
import { zh, type MessageKey } from './zh'

/** Every DSH-official locale, in the shape `locale.register` expects. */
export const DICT = { zh, en, ja, es, fr, de, ru, pt }

/** Interpolate `{name}` placeholders; an absent value leaves the placeholder alone. */
export function fill(template: string, vars?: Record<string, any>): string {
  return String(template).replace(/\{(\w+)\}/g, (match, name) => {
    return vars && vars[name] !== undefined && vars[name] !== null ? String(vars[name]) : match
  })
}

/**
 * Translate through the locale service, falling back to the bundled copy.
 *
 * `say` stays string-keyed for now: the panel passes keys through props and
 * literal objects, so a stricter key type waits until those call sites settle.
 */
export function makeSay(ctx: DshClientCtx, getLocaleId: () => string) {
  let boundService: unknown
  let bound: ((key: string) => unknown) | null = null
  let hasSynced = false
  /**
   * Bind lazily and re-bind when the service identity changes: a client-plugin
   * reload can replace the locale service after this closure was created, and a
   * binding captured from the old one would silently stop translating.
   */
  const translate = () => {
    let locale: DshLocaleService | undefined
    try {
      locale = ctx.get('locale')
    } catch {
      // A disposed plugin context may no longer resolve services; the bundled
      // dictionaries still answer, so treat it as "no service".
      return null
    }
    if (hasSynced && locale === boundService) return bound
    hasSynced = true
    boundService = locale
    bound = locale && typeof locale.bind === 'function' ? locale.bind(NS) : null
    return bound
  }
  return (key: string) => {
    const boundTranslate = translate()
    if (boundTranslate) {
      try {
        const value = boundTranslate(key)
        if (typeof value === 'string' && value && value !== key) return value
      } catch {
        /* fall through */
      }
    }
    const language = String(getLocaleId()).split('-')[0].toLowerCase()
    const dict = (DICT as Record<string, Record<string, string>>)[language] || DICT.en
    // English is the complete bundle, so it is the last resort before the raw key:
    // a drifted dictionary shows English, never Chinese, to a non-Chinese reader.
    return dict[key] || DICT.en[key as MessageKey] || key
  }
}
