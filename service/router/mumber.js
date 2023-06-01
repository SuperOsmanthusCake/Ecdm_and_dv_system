// 这是会员信息的路由模块
const express = require('express')
const router = express.Router()

// 导入会员信息的路由处理函数模块
const mumber_handler = require('../router_handler/mumber')
// 获取会员信息列表数据的路由
router.post('/mumber', mumber_handler.getMumber)
// 根据id的值删除信息
router.delete('/mumber/:id', mumber_handler.mumberDel)
// 新增数据
router.post('/addmumber', mumber_handler.addMumber)

module.exports = router
