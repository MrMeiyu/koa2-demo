const JWT = require('jsonwebtoken')
const {
  secret
} = require('./const')

async function getJWTPayload(ctx, next) {
  try {
    let token = ctx.header.authorization
    if (token) {
      const decoded = JWT.verify(token.split(' ')[1], secret, )
      ctx.user = {
        ...decoded
      }
    }
    await next()
  } catch (err) {
    ctx.throw(`getJWTPayload：${err}`)
  }
}

module.exports = getJWTPayload