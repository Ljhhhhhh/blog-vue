const User = require('../models/user')

// 需要权限验证的接口
const needAuthList = ['/handleArticle', '/delArticle', '/upload']

const auth = () => {
  return async(ctx, next) => {
    if (needAuthList.includes(ctx.path)) {
      const {
        token,
        account
      } = ctx.request.headers;
      const authRes = await check(token, account)
      if (authRes) {
        await next()
      } else {
        ctx.body = {
          code: 402,
          msg: '请登录！'
        }
        return
      }
    } else {
      await next()
    }
  }
}

const check = async (token, account) => {
  if (!token || !account) {return false}
  const user = await User.findOne({account: account});
  if (user && user.token === token) {
    return true
  } else {
    return false
  }
}

module.exports = auth