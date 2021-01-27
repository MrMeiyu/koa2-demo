const mongoose = require('../db')
const User = mongoose.model('User')

// Token 验证
exports.hasToken = async (ctx, next) => {
  const accessToken = ctx.query.accessToken

  if (!accessToken) {
    accessToken = ctx.request.body.accessToken
    ctx.body = {
      success: false,
      err: '令牌失效'
    }
    return next
  }

  const user = await User.findOne({
    accessToken,
  }).exec()

  if (!user) {
    ctx.body = {
      success: false,
      err: '用户没登陆'
    }
    return next
  }

  ctx.session = ctx.session || {}
  ctx.session.user = user

  await next()
}