const router = require('koa-router')()
const CImage = require('../controllers/upload')
const cImage = new CImage()
const config = require('../config')

router.post('/upload', async (ctx, next) => {
  const file = ctx.request.files.file;
  const res = await cImage.uploadImage(file)
  if (res) {
    ctx.body = {
      url: config.baseUrl + res
    }
  }
})

module.exports = router
