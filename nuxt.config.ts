// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/icon'],
  pages: true // должно быть true, или просто не указывать  
})
