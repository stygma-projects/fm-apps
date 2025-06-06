import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.css'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import { router } from './router.ts'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { createI18n } from 'vue-i18n'
import { fr } from './locales/fr.ts'
import { VueQueryPlugin } from '@tanstack/vue-query'
import ConfirmationService from 'primevue/confirmationservice'

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: {
    fr: fr,
  },
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin)
app.use(i18n)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
})
app.use(ConfirmationService)
app.use(ToastService)

app.mount('#app')
