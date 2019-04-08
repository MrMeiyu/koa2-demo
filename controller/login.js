const JWT = require('jsonwebtoken')
const LoginService = require('../service/login')
const {
  secret
} = require('../util/const')

module.exports = {
  sedLogin: async ctx => {
    let query = ctx.request.body
    let userInfo = await LoginService.findOneUser(query)
    if (userInfo) {
      const token = JWT.sign({
        userName: userInfo.userName,
      }, secret, { expiresIn: '1h' })
      ctx.body = {
        code: 200,
        success: true,
        message: '登陆成功',
        data: Object.assign({}, userInfo._doc, {
          token
        })
      }
    } else {
      ctx.body = {
        code: 400,
        success: false,
        message: '登陆失败',
        data: null,
      }
    }
  }
}