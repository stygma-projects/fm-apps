import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.css'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import { router } from './router.ts'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { VueQueryPlugin } from 'vue-query'
import { createI18n } from 'vue-i18n'
import { fr } from './locales/fr.ts'

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
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
})

app.mount('#app')
