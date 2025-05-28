import tailwindcss from '@tailwindcss/vite';
import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    port: 3001
  },
  modules: [
    '@primevue/nuxt-module', 
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ], 
  css: ['~/assets/styles/main.css'],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    },
    components: {
      prefix: 'Prime',
      exclude: ['Form', 'FormField', 'Editor', 'Chart']
    }
  }, 
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  i18n: {
    restructureDir: 'src/i18n',
  }
})