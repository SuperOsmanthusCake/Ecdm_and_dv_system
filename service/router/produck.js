// 这是会员信息的路由模块
const express = require('express')
const router = express.Router()

// 导入会员信息的路由处理函数模块
const produck_handler = require('../router_handler/produck')
// 获取会员信息列表数据的路由
router.post('/mumberProduct', produck_handler.getMumberProduck)
// 新增数据
router.post('/addmumberProduct', produck_handler.addMumberProduck)

module.exports = router
