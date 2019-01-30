
## 项目规范

`
  ├─ controller/          // 用于解析用户的输入，处理后返回相应的结果
  ├─ service/             // 用于编写业务逻辑层，比如连接数据库，调用第三方接口等
  ├─ errorPage/           // http 请求错误时候，对应的错误响应页面
  ├─ logs/                // 项目运用中产生的日志数据
  ├─ middleware/          // 中间件集中地，用于编写中间件，并集中调用
  │  ├─ mi-http-error/
  │  ├─ mi-log/
  │  ├─ mi-send/
  │  └── index.js
  ├─ public/              // 用于放置静态资源
  ├─ views/               // 用于放置模板文件，返回客户端的视图层
  ├─ router.js            // 配置 URL 路由规则
  └─ app.js               // 用于自定义启动时的初始化工作，比如启动 https，调用中间件，启动路由等
`