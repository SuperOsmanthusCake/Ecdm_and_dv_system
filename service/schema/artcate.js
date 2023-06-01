// 1.导入验证规则的模块
const joi = require('joi')

// 2.定义name 和 alias 的验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 定义 id 的验证规则
const id = joi.number().integer().min(1).required()

// 3.向外共享验证规则对象
exports.add_cate_schema = {
    body:{
        name,
        alias
    }
}

// 删除分类的验证规则对象
exports.delete_cate_schema = {
    params:{
        id,
    }
}

// 根据 id 获取文章分类的验证规则对象
exports.get_cate_schema = {
    params:{
        id,
    }
}

// 更新分类的验证规则对象
exports.update_cate_schema = {
    body:{
        Id:id,
        name,
        alias
    }
}