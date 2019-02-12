const Router = require('koa-router');

const router = new Router({
  prefix: '/api',
})

module.exports = (app) => {

  router.get( '/', app.controller.home.index)
  router.get('/home', app.controller.home.home)
  router.get('/home/:id/:name', app.controller.home.homeParams)
  router.get('/user', app.controller.home.login)
  router.post('/user/register', app.controller.home.register)

  /* 登陆 */
  router.post('/login', app.controller.login.sedLogin)

  /* 注册 */
  router.post('/register', app.controller.register.sedRegister)

  /* 用户 */
  router.get('/userList', app.controller.user.pageListUser)
  router.post('/findIdUser', app.controller.user.findIdUser)
  router.post('/addUser', app.controller.user.addUser) 
  router.post('/updateUser', app.controller.user.updateUser)
  router.get('/deleteUser/:id', app.controller.user.deleteUser)

  /* 电影爬虫数据 */
  router.get('/movieList', app.controller.movie.pageListMovie)

  /* 上传文件 */
  router.post('/uploadFile', app.controller.file.uploadFile)

  app.use(router.routes())
      .use(router.allowedMethods())
}