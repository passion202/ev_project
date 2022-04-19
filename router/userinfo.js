//TODO：模块导入
const express = require('express')// 导入 express
const router = express.Router()// 创建路由对象
const userInfo_handler = require('../router_handler/userinfo')// 导入用户信息的处理函数模块
const expressJoi = require('@escook/express-joi')// 导入验证数据合法性的中间件

// 导入需要的验证规则对象
const {
    update_userInfo_schema,
    update_password_schema,
    update_avatar_schema
} = require('../schema/user')

// 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userInfo_handler.updatePassword)

//修改 更新用户头像 的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userInfo_handler.updateAvatar)

// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_userInfo_schema), userInfo_handler.updateUserInfo)

//TODO：共享路由模块
module.exports = router