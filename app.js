//TODO：模块导入
const express = require('express') //导入express模块
const app = express() //创建服务器实例
const cors = require('cors') //导入cors中间件
const joi = require('joi')
const userInfoRouter = require('./router/userinfo') // 导入用户信息路由模块
const articleRouter = require('./router/article') // 导入并使用文章路由模块
const artCateRouter = require('./router/artcate') // 导入并使用文章分类路由模块
const expressJWT = require('express-jwt') // 解析 token 的中间件
const config = require('./config') // 导入配置文件
const userRouter = require('./router/user') //导入路由模块

//TODO： 中间件
app.use(cors()) //将cors注册成全局中间件

//配置解析表单数据中间件
app.use(express.urlencoded({
    extended: false
}))

app.use((req, res, next) => {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = (err, status = 1) => {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({
    secret: config.jwtSecretKey
}).unless({
    path: [/^\/api\//]
}))

//TODO：挂载路由
app.use('/api', userRouter) //挂载API路由
app.use('/my', userInfoRouter) // 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my/article', artCateRouter) // 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter) // 为文章的路由挂载统一的访问前缀 /my/article
app.use('/uploads', express.static('./uploads')) // 托管静态资源文件


//全局错误级别中间件,捕获验证失败的错误，并把验证失败的结果响应给客户端
app.use((err, req, res, next) => {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知错误
    res.cc(err)
})

//TODO：启动服务器
app.listen(3007, () => console.log('api server running at http://127.0.0.1:3007'))