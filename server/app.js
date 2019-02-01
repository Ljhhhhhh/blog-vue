const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const KoaBody = require('koa-body')
const mongoose = require('mongoose')
const dbConfig = require('./models/config')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const auth = require('./middlewares/auth')

const registerRouter = require('./routes/index')()

const static = require('koa-static')
const path = require('path')
// error handler
onerror(app)

// middlewares
app.use(cors())

app.use(json())
app.use(logger())


mongoose.Promise = global.Promise
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFieldsSize: 200 * 1024 * 1024
  },
  strice: false
}))

app.use(auth())
// app.use(async (ctx, next) => {
//   if (ctx.path !== '/login') {
//     const {
//       token,
//       account
//     } = ctx.request.headers;
//     const authRes = await auth(token, account)
//     if (authRes) {
//       await next()
//     } else {
//       ctx.body = {
//         code: 402,
//         msg: '请登录！'
//       }
//       return
//     }
//   } else {
//     await next()
//   }
// })

app.use(registerRouter)

app.use(static(
  path.join(__dirname, '/public')
))

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app