//TODO：模块导入
const express = require('express') // 导入 express
const router = express.Router() // 创建路由对象
const multer = require('multer') // 导入解析 formdata 格式表单数据的包
const path = require('path') // 导入处理路径的核心模块
const expressJoi = require('@escook/express-joi') // 导入验证数据的中间件

// 导入文章的验证模块
const {
    add_article_schema
} = require('../schema/article')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({
    dest: path.join(__dirname, '../uploads')
})

// 导入文章的路由处理函数模块
const article_handler = require('../router_handler/article')

// 发布新文章的路由
// 注意：在当前的路由中，先后使用了两个中间件：
// 先使用 multer 解析表单数据
// 再使用 expressJoi 对解析的表单数据进行验证
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)

//TODO：共享路由模块
module.exports = router