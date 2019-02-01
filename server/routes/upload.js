const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const MImage = require('../models/image')

router.post('/upload', async (ctx, next) => {
  const file = ctx.request.files.file;
  const name = Date.now();
  const ext = file.name.split('.').pop();
  const reader = fs.createReadStream(file.path);
  let uploadPath = `../public/images/${name}.${ext}`;
  let filePath = path.join(__dirname, uploadPath);
  const savePath = `/images/${name}.${ext}`
  const upSteam = fs.createWriteStream(filePath);
  reader.pipe(upSteam);
  const image = new MImage({
    savePath
  })
  const res = await image.save();
  if (res) {
    ctx.body = {
      url: 'http://127.0.0.1:1234' + savePath
    }
  }
})

module.exports = router
