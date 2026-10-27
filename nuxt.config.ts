// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/styles/base.css',
    '~/assets/styles/utilities.css'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],
  i18n: {
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'es', name: 'Spanish', file: 'es.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ]
  },
  runtimeConfig: {
    baseUrl: '',
    // Lambda de contacto (SES). No son secretos: el acceso se da por OIDC de Vercel
    contactLambdaUrl: 'https://v4gp245fg5tzdurlh4fmsjw5fu0gdsgw.lambda-url.us-west-2.on.aws/',
    contactRoleArn: 'arn:aws:iam::020139097054:role/vercel-portfolio-contact',
    contactAwsRegion: 'us-west-2'
  },
})