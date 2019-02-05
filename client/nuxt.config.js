const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',
    '@/static/icon/iconfont.css',
    {
      src: '@/static/styles/main.scss',
      lang: 'scss'
    }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src:'~/plugins/element-ui',
      ssr: true
    },
    '@/plugins/headInfo.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // vendor: ['axios'],
    extractCSS: true,
    // extend(config, {
    //   isDev
    // }) {
    //   if (!isDev) {
    //     config.output.publicPath = '/_nuxt/';
    //   }
    // }
  },
  server: {
    port: 1233, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (!to.hash) {
        return {
          x: 0,
          y: 0
        }
      }
    },
  }
}
