const router = require('koa-router')()
const CUser = require('../controllers/user')
const cUser = new CUser()

router.post('/login', async (ctx, next) => {
  const {
    account,
    password
  } = ctx.request.body;
  const token = await cUser.login(account, password);
  if (token) {
    ctx.body = {
      token,
      code: 0,
      msg: '登录成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '登录失败'
    }
  }
})

module.exports = router