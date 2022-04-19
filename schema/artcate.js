//TODO：模块导入
const joi = require('joi') // 导入定义验证规则的模块
const name = joi.string().required()// 定义 分类名称的校验规则
const alias = joi.string().alphanum().required()// 定义 分类别名 的校验规则
const id = joi.number().integer().min(1).required() // 定义 分类Id 的校验规则

//TODO：校验规则对象 - 添加分类
exports.add_cate_schema = {
    body: {
        name,
        alias,
    },
}

//TODO：校验规则对象 - 删除分类
exports.delete_cate_schema = {
    params: {
        id,
    },
}

//TODO： 校验规则对象 - 更新分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias,
    },
}

//TODO：校验规则对象 - 根据 Id 获取分类
exports.get_cate_schema = {
    params: {
        id,
    },
}