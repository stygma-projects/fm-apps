import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice'
import App from './app.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(ToastService)
app.mount('#app')