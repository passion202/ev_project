//TODO：模块导入
const express = require('express') //导入express
const router = express.Router() //创建路由对象
const userHandler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')// 导入验证表单数据的中间件

//导入需要的验证规则对象
const {
    reg_login_schema
} = require('../schema/user')

router.post('/register', expressJoi(reg_login_schema), userHandler.register) //注册信用户
router.post('/login', expressJoi(reg_login_schema), userHandler.login) //登录

//TODO：共享路由模块
module.exports = router 