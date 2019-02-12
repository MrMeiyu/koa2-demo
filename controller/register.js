const RegisterService = require('../service/register')

module.exports = {
  sedRegister: async ctx => {
    let query = ctx.request.body
    let data = await RegisterService.registerUser(query)
    console.log(data, 'data')
    if (data) {
      ctx.body = {
        code: 200,
        success: true,
        message: '注册成功',
        data,
      }
    } else {
      ctx.body = {
        code: 400,
        success: false,
        message: '注册失败',
        data: null,
      }
    }
  }
}