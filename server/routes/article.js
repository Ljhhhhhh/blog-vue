const router = require('koa-router')()
const CArticle = require('../controllers/article')
const CCommon = require('../controllers/common')

const cArticle = new CArticle()
const cCommon = new CCommon()

router.get('/getCount', async (ctx, next) => {
  const {
    categoryTotal,
    tagTotal,
    articleTotal
  } = await cCommon.getCount()
  ctx.body = {
    code: 0,
    categoryTotal,
    tagTotal,
    articleTotal,
  }
})

router.post('/articles', async (ctx, next) => {
  const {
    size,
    page
  } = ctx.request.body;
  const {
    articles,
    total
  } = await cArticle.getList(page, size)
  if (articles) {
    ctx.body = {
      articles,
      total,
      code: 0,
    }
  } else {
    ctx.body = {
      code: 10001
    }
  }
})

router.post('/articles/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const res = await cArticle.getDetail(id);
  if (res) {
    ctx.body = {
      code: 0,
      data: res
    }
  } else {
    ctx.body = {
      code: 1,
    }
  }
})

router.post('/handleArticle', async (ctx, next) => {
  const content = ctx.request.body
  const res = await cArticle.handleArticle(content)
  if (res) {
    let msg = content.id ? '更新成功' : '发布成功'
    ctx.body = {
      code: 0,
      msg
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '提交失败'
    }
  }
})

router.post('/delArticle', async (ctx, next) => {
  const {
    id
  } = ctx.request.body;
  const res = await cArticle.delArticle(id)

  if (res) {
    ctx.body = {
      code: 0,
      msg: '删除成功'
    }
  } else {
    ctx.body = {
      code: 1
    }
  }
})

module.exports = router