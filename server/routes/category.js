const router = require('koa-router')()
const CCategory = require('../controllers/category')

const cCategory = new CCategory()

router.get('/categorys', async (ctx, next) => {
  const articlesByCategory = await cCategory.getList()
  
  ctx.body = {
    code: 0,
    articlesByCategory,
    total: articlesByCategory.length
  }
})

module.exports = router
