// 导入数据库操作模块
const db = require('../db/index')
const imgUrl = require('../router_handler/static')
// 获取商品信息列表的处理函数
exports.getMumberProduck = (req, res) => {
  console.log(1111)
  // 定义查询分类列表数据的 sql 语句
  let sql = ''
  sql = 'select * from ev_commodity'
  // 调用 db.query() 执行 sql 语句
  db.query(sql, (err, results) => {
    // sql语句执行错误
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取商品信息数据成功',
      data: results
    })
  })
}

// 新增商品信息的处理函数
exports.addMumberProduck = (req, res) => {
  req.body.img_goods = 'http://127.0.0.1:8080/static/' + imgUrl.imgUrl
  console.log(imgUrl)
  const originalDate = new Date(req.body.time_goods)
  const formattedDate = originalDate.toLocaleString('zh-CN', {
    timeZone: 'UTC',
    hour12: false
  })
  req.body.time_goods = formattedDate
  console.log(req.body)
  // 定义查重的 sql 语句
  const sql = 'select * from ev_commodity where number_goods=?'
  // 执行查重的 sql 语句
  db.query(sql, req.body.number_goods, (err, results) => {
    // sql 语句执行失败
    if (err) return res.cc(err)
    // 判断数据的长度
    if (results.length === 1) return res.cc('品番号被占用，请更换后再试！')
    // 定义新增文章的 sql 语句
    const sql = 'insert into ev_commodity set ?'
    // 执行插入会员信息的 sql 语句
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err)
      console.log(4444)
      if (results.affectedRows !== 1) return res.cc('新增商品信息失败!')
      res.cc(':新增商品信息成功!', 0)
    })
  })
}
