// 服务器的入口文件
// 1.创建koa的实例对象
const Koa = require('koa')
const app = new Koa()
// 2.绑定中间件
// 绑定第一层中间件
const respDurationMiddleware = require('./middleware/koa_response_duration.js')
app.use(respDurationMiddleware)
// 绑定第二层中间件
const repHeaderationMiddleware = require('./middleware/koa_response_header.js')
app.use(repHeaderationMiddleware)
// 绑定第三层中间件
const respDataationMiddleware = require('./middleware/koa_response_data.js')
app.use(respDataationMiddleware)
// 3.绑定端口号 8888
app.listen(8088)

const webSocketService = require('./service/web_socket_service')
// 开启服务端的监听
webSocketService.listen()
