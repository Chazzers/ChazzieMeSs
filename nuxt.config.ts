// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    mongoUrl: process.env.DATABASE_URL,
    id: process.env.ID,
  },
  // nitro: {
  //   // routeRules: {
  //   //   "/api/**/**": {
  //   //     cors: true,
  //   //   },
  //   //   "/api/**": {
  //   //     proxy: { to: "/api/**" },
  //   //   },
  //   // },
  //   devProxy: {
  //     "/api/**": { target: "http://localhost:5500", changeOrigin: true },
  //   },
  // },
  routeRules: {
    "/api/content/**": {
      cors: true,
      headers: {
        // CORS headers
        "Access-Control-Allow-Origin": "http://localhost:5500", // 'http://example:6006', has to be set to the requesting domain that you want to send the credentials back to
        "Access-Control-Allow-Methods": "GET", // 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "*", // 'Origin, Content-Type, Accept, Authorization, X-Requested-With'
        "Access-Control-Expose-Headers": "*",
        // 'Access-Control-Max-Age': '7200', // 7200 = caching 2 hours (Chromium default), https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age#directives
      },
    },
  },
});
