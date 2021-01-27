const xss = require('xss')
const uuid = require('uuid')
// const UserModel = require('../db/models/user')
const mongoose = require('../db/index')
const UserService = require('../service/user')

module.exports = {
  // 查询用户
  pageListUser: async ctx => {
    let query = ctx.request.body
    // let newId = mongoose.Types.ObjectId(_id)
    let data = await UserService.pageListUser(query)
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
  // 用过id查询单个用户
  findIdUser: async ctx => {
    let { id, } = ctx.request.body
    let data = await UserService.findIdUser(id)
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
        data: null,
      }
    }
  },
  // 新增用户
  addUser: async ctx => {
    let params = ctx.request.body
    console.log(params, '获取body中的数据')
    // let user = new UserModel({
    //   nickname: '测试用户',
    //   avatar: 'http://ip.example.com/u/xxx.png',
    //   phoneNumber: xss('13800138000'),
    //   verifyCode: '5896',
    //   accessToken: uuid.v4()
    // })
    let newParams = Object.assign({}, params, {
      accessToken: uuid.v4(),
      phoneNumber: xss(params.phoneNumber),
    })
    let data
    try {
      data = await UserService.addUser(newParams)
    } catch (err) {
      data = err
    }
    if (data) {
      ctx.body = {
        code: 200,
        success: data,
        message: '新增成功',
      }
    } else {
      ctx.body = {
        code: 400,
        success: data,
        message: '新增失败',
      }
    }
  },
  // 更新用户
  updateUser: async ctx => {
    let params = ctx.request.body
    let data
    try {
      data = await UserService.updateUser(params)
    } catch (err) {
      data = err
    }
    if (data) {
      ctx.body = {
        code: 200,
        success: data,
        message: '修改成功',
      }
    } else {
      ctx.body = {
        code: 400,
        success: data,
        message: '修改失败',
      }
    }
  },
  // 删除用户
  deleteUser: async ctx => {
    console.log(ctx.params)
    let { id } = ctx.params
    let data = await UserService.deleteUser(id)
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
        data: null,
      }
    }
  }
}