// 导入数据库操作模块
const db = require('../db/index')

// 获取会员信息列表的处理函数
exports.getMumber = (req, res) => {
  // 定义查询分类列表数据的 sql 语句
  let sql = ''
  if (req.body.name === '' || req.body.name == null) {
    sql = 'select * from ev_member where is_delete=0 order by id asc'
    // 调用 db.query() 执行 sql 语句
    db.query(sql, (err, results) => {
      // sql语句执行错误
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取会员信息数据成功',
        data: results
      })
    })
  } else {
    sql = 'select * from ev_member where name=? and is_delete=0 order by id asc'
    // 调用 db.query() 执行 sql 语句
    db.query(sql, req.body.name, (err, results) => {
      // sql语句执行错误
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取会员信息数据成功',
        data: results
      })
    })
  }
}

// 更具 id 删除数据
exports.mumberDel = (req, res) => {
  // 定义标记删除会员信息的 sql
  const sql = 'update ev_member set is_delete=1 where id = ?'
  console.log(req.params.id)
  // 调用 db.query() 来执行 sql
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc(': 删除会员信息失败!')
    res.cc(': 删除会员信息成功!')
  })
}

// 新增会员信息的处理函数
exports.addMumber = (req, res) => {
  // 定义查重的 sql 语句
  const sql = 'select * from ev_member where telephone=?'
  // 执行查重的 sql 语句
  db.query(sql, req.body.telephone, (err, results) => {
    // sql 语句执行失败
    if (err) return res.cc(err)
    // 判断数据的长度
    if (results.length === 1) return res.cc('电话号码被占用，请更换后再试！')

    // 定义新增文章的 sql 语句
    const sql = 'insert into ev_member set ?'
    // 执行插入会员信息的 sql 语句
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增会员信息失败!')
      res.cc(':新增会员信息成功!', 0)
    })
  })
}
