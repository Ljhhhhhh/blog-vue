const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const KoaBody = require('koa-body')
const mongoose = require('mongoose')
const dbConfig = require('./models/config')
const logger = require('koa-logger')
const cors = require('koa2-cors')

const index = require('./routes/index')
const users = require('./routes/users')
const upload = require('./routes/upload')
const static = require('koa-static')
const path = require('path')
// error handler
onerror(app)

// middlewares
app.use(cors())
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))

app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))


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

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())

app.use(static(
  path.join(__dirname, '/public')
))

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
