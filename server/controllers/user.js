const User = require('../models/user')

class UserController {
  async login(account, password) {
    const user = await User.findOne({
      account: account,
      password: password
    })
    if (user) {
      const token = Date.now() + '~!@#$%' + account
      await user.update({
        token
      })
      return token
    } else {
      return ''
    }
  }
}

module.exports = UserController