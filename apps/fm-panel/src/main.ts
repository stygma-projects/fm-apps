import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.css'
import { createPinia } from 'pinia'
import { router } from './router.ts'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { VueQueryPlugin } from "vue-query";

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin);
app.use(PrimeVue,  {
    theme: {
        preset: Aura,
    }
});

app.mount('#app')
