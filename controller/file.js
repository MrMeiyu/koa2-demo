const fs = require('fs')
const os = require('os')
const path = require('path')

module.exports = {
  // 上传文件
  uploadFile: async (ctx, next) => {
    if (ctx.method != 'POST') return await next()
    let data = ctx.request.files
    if (data) {
      ctx.body = {
        code: 200,
        success: true,
        message: '上传成功',
        data,
      }
    } else {
      ctx.body = {
        code: 400,
        success: false,
        message: '上传失败',
        data: [],
      }
    }
  }
}