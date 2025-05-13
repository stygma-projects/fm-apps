import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@primevue/nuxt-module', '@nuxtjs/i18n'], 
  css: ['~/assets/styles/main.css'],
  primevue: {
    options: {
      theme: {
        preset: 'Aura',
        options: {
          darkModeSelector: false,
        },
      },
    },
    components: {
      exclude: ['Form', 'FormField']
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