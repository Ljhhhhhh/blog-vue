const router = require('koa-router')()
const CTag = require('../controllers/tag')
const cTag = new CTag()

router.post('/articlesByTag', async (ctx, next) => {
  const {
    tag
  } = ctx.request.body;
  const res = await cTag.articlesByTag(tag)
  ctx.body = {
    code: 0,
    articles: res
  }
})

router.get('/tags', async (ctx, next) => {
  const {
    tags,
    total
  } = await cTag.getList()
  ctx.body = {
    code: 0,
    tags,
    total,
  }
})

module.exports = router