// 1.导入express
let express = require('express')
// 2.创建web服务器
let app = express()
const joi = require('joi')
// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())

// 注意除了错误级别的中间件，其它中间件都要在路由配置之前
// 通过express.josn这个中间件，解析表单中的josn格式的数据
app.use(express.json())
// 通过express.josn这个中间件，来解析表单中的url-encodeed的格式数据
app.use(express.urlencoded({ extended: false }))

// 挂载一个静态资源库
app.use(express.static(__dirname + '/public'))

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值为 1，表示失败的情况
  // err 的值，可能只一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 一定要在路由之前配置解析 token 的中间件
const { expressjwt } = require('express-jwt')
const config = require('./config')

app.use(
  expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/api\//, /^\/public\//, /^\/static\//]
  })
)

// 导入并使用路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息的路由模块
const mumberRouter = require('./router/mumber')
app.use('/my', mumberRouter)
// 导入并使用商品信息的路由模块
const produckRouter = require('./router/produck')
app.use('/my', produckRouter)
// 导入并使用图片添加的路由模块
const static = require('./router/static')
app.use(static)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 省份认证验证错误
  if (err.name === 'UnauthorizedError') return res.cc(err)
  res.cc(err)

  next()
})
// 3.启动web服务器
app.listen(8080, () => {
  console.log('express server runing at http://127.0.0.1:8080')
})
