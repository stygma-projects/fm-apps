import { fr } from './locales/fr'

export default defineI18nConfig(() => {
  return {
    locale: 'fr',
    fallbackLocale: 'fr',
    messages: {
      fr: fr,
    },
  }
})
