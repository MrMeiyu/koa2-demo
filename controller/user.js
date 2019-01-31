const xss = require('xss')
const uuid = require('uuid')
const UserModel = require('../db/models/user')
const UserService = require('../service/user')

module.exports = {
  // 查询用户
  pageListUser: async ctx => {
    let query = {}
    let data = await UserService.pageListUser(query)
    if (data) {
      ctx.body = {
        success: true,
        data,
      }
    }
  },
  // 新增用户
  addUser: async ctx => {
    let params = ctx.request.body
    console.log(params, '获取body中的数据')
    let user = new UserModel({
      nickname: '测试用户',
      avatar: 'http://ip.example.com/u/xxx.png',
      phoneNumber: xss('13800138000'),
      verifyCode: '5896',
      accessToken: uuid.v4()
    })
    let data = await UserService.addUser(user)
    if (data) {
      ctx.body = {
        success: true,
        data,
      }
    }
  }
}