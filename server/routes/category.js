const router = require('koa-router')()
const CCategory = require('../controllers/category')

const cCategory = new CCategory()

router.get('/articlesByCategory', async (ctx, next) => {
  const articlesByCategory = await cCategory.getArticleByCategory()
  
  ctx.body = {
    code: 0,
    articlesByCategory,
    total: articlesByCategory.length
  }
})

router.get('/categorys', async (ctx, next) => {
   const {categorys} = await cCategory.getList()
   ctx.body = {
     code: 0,
     categorys
   }
})

module.exports = router
