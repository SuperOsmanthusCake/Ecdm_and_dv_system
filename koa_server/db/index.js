// 数据库配置文件
// 导入 mysql
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '098851',
  database: 'my_db_01'
})

// 暴露数据库对象
module.exports = db
