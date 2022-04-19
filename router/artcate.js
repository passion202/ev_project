//TODO：模块导入
const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi') // 导入验证数据的中间件
const artcate_handler = require('../router_handler/artcate') // 导入文章分类的路由处理函数模块

router.get('/cates', artcate_handler.getArticleCates) // 获取文章分类的列表数据
router.post('/addcates', artcate_handler.addArticleCates) // 新增文章分类的路由

const {
    // 导入文章分类的验证模块
    add_cate_schema,
    // 导入删除分类的验证规则对象
    delete_cate_schema,
    // 导入根据 Id 获取分类的验证规则对象
    get_cate_schema,
    // 导入更新文章分类的验证规则对象
    update_cate_schema,
} = require('../schema/artcate')

//TODO： 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)

//TODO：删除文章分类的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)

//TODO：根据 Id 获取文章分类的路由
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArtCateById)

//TODO：更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)


//TODO：共享路由模块
module.exports = router