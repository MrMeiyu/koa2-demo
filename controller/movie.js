const MovieService = require('../service/movie')

module.exports = {
  // 查询用户
  pageListMovie: async ctx => {
    let query = ctx.request.body
    let data = await MovieService.pageListMovie(query)
    if (data) {
      ctx.body = {
        code: 200,
        success: true,
        message: '请求成功',
        data,
      }
    } else {
      ctx.body = {
        code: 400,
        success: false,
        message: '请求失败',
        data: [],
      }
    }
  },
}