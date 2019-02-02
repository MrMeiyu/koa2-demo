const path = require('path')
const ip = require('ip')
const koaBody = require('koa-body')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')
const checkDirExist = require('../util/checkDirExist')
const getUploadFileExt = require('../util/getUploadFileExt')
const getUploadFileName = require('../util/getUploadFileName')
const moment = require('moment')

const miSend = require('./mi-send')
const miLog = require('./mi-log')
const miHttpError = require('./mi-http-error')
// 引入规则中件间
const miRule = require('./mi-rule')

module.exports = (app) => {
  /**
   * 在接口的开头调用
   * 指定 controller 文件夹下的 js 文件，挂载在 app.controller 属性
   * 指定 service 文件夹下的 js 文件，挂载在 app.service 属性
   */ 
  miRule({
    app,
    rules: [
      {
        folder: path.join(__dirname, '../controller'),
        name: 'controller'
      },
      {
        folder: path.join(__dirname, '../service'),
        name: 'service'
      }
    ]
  })

  app.use(miHttpError({
    errorPageFolder: path.resolve(__dirname, '../errorPage')
  }))
  app.use(miLog({
    env: app.env,  // koa 提供的环境变量
    projectName: 'koa-demo',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }))

  app.use(staticFiles(path.resolve(__dirname, "../public")))

  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }));
  app.use(koaBody({
    multipart: true, // 支持文件上传
    encoding: 'utf-8',
    formidable: {
      uploadDir: path.join(__dirname, '../public/upload'), // 文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传的大小
      onFileBegin: (name, file) => { // 文件上传的设置
        const ext = getUploadFileExt(file.name)
        const currentTime = moment().format('YYYY-MM-DD')
        const dirName = getUploadFileName()
        const dir = path.join(__dirname, `../public/upload/${currentTime}`)
        const fileName = getUploadFileName(ext)
        checkDirExist(dir)
        file.path = `${dir}/${fileName}`
        app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
        app.context.uploadpath[name] = `${dirName}/${fileName}`;
      },
      onError: (err) => {
        console.error(`文件插件报错：${err}`)
      }
    },
  }))
  app.use(miSend())

  // 增加错误的监听处理
  app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 500
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}