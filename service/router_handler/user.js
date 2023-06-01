// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcrytjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

// 注册新用户的处理函数
exports.regUser = (req, res) => {
  // 拿到客户端提交的信息
  const userinfo = req.body
  // 对表单中的数据进行合法性的校验
  // if(!userinfo.username || !userinfo.password){
  //     // return res.send({ status:1,message:'用户名或密码不合法' })
  //     return res.cc('用户名或密码不合法')
  // }

  // 定义sql语句，查询用户名是否被占用
  const sqlStr = 'select * from ev_users where username = ?'
  db.query(sqlStr, userinfo.username, (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      // *return res.send({ status: 1,message: err.message })
      return res.cc(err)
    }
    // 判断用户名是否被占用
    if (results.length > 0) {
      // *return res.send({ status: 1,message: '用户名被占用请更换！' })
      return res.cc('用户名被占用请更换！')
    }
    // 调用 bcrypt.hashSync() 对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 定义插入新用户的 sql 语句
    const sql = 'insert into ev_users set ?'
    // 调用 db.query() 执行 sql语句
    db.query(
      sql,
      { username: userinfo.username, password: userinfo.password },
      (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
          // *return res.send({ status: 1,message: err.message })
          return res.cc(err)
        }
        // 判断影响行数是否为1
        if (results.affectedRows !== 1)
          // *return res.send({status:1,message:'注册用户失败，请稍后再试！'})
          return res.cc('注册用户失败，请稍后再试！')
        // 注册成功
        // *res.send({status:0,message:'注册成功！'})
        res.cc('注册成功！', 0)
      }
    )
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  console.log(req.body)
  // 接收表单数据
  const userinfo = req.body
  // 定义 SQL
  const sql = 'select * from ev_users where username=?'
  // 执行 SQL 语句，根据用户名查询用户信息
  db.query(sql, userinfo.username, (err, results) => {
    // 执行sql失败
    if (err) return res.cc(err)
    // 执行的 SQL 语句成功，但影响的数据条数不等于1
    if (results.length !== 1) return res.cc('你登陆失败了！')
    // 判断密码
    // 拿着用户输入的密码，和数据库的密码
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    )
    if (!compareResult) return res.cc('密码错误')
    // 在服务器生成 Token 的字符串
    // 排除用户的密码和头像数据
    const user = { ...results[0], password: '', user_pic: '' }
    // 对用户的信息进行加密，生成 token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' })
    // 调用res.send() 将token响应给客户端

    res.send({
      status: 0,
      message: '登录成功',
      token: 'Bearer ' + tokenStr
    })
  })
}
