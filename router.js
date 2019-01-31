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

  /* 用户 */
  router.post('/userList', app.controller.user.pageListUser)
  router.post('/addUser', app.controller.user.addUser) 

  app.use(router.routes())
      .use(router.allowedMethods())
}