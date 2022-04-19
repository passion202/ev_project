//TODO：模块导入
const joi = require('joi')// 导入定义验证规则的模块
const title = joi.string().required()// 定义 标题的验证规则
const cate_id = joi.number().integer().min(1).required()// 定义 分类Id的验证规则
const content = joi.string().required().allow('')// 定义 内容的验证规则
const state = joi.string().valid('已发布', '草稿').required()// 定义 发布状态的验证规则

//TODO： 验证规则对象 - 发布文章
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
    },
}