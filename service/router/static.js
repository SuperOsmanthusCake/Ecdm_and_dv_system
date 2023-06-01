// 这是会员信息的路由模块
const express = require('express')
const router = express.Router()

// 导入会员信息的路由处理函数模块
const produck_handler = require('../router_handler/static')
// 获取会员信息列表数据的路由
router.post('/static', produck_handler.setImg)

module.exports = router
