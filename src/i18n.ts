import { getRequestConfig } from 'next-intl/server'

// Lingue supportate
export const locales = ['it', 'en', 'es'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'it'

export default getRequestConfig(async ({ locale }) => {

  const safeLocale = locale || defaultLocale;

  // console.log('🌍 i18n.ts - locale ricevuta:', locale, '→ usando:', safeLocale)

  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default
  }
})