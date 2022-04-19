//TODO：模块导入
const db = require('../db/index') //导入数据库操作模块
const jwt = require('jsonwebtoken') // 导入配置文件
const bcrypt = require('bcryptjs') // 用这个包来生成 Token 字符串
const config = require('../config') //注册信用户处理函数

exports.register = (req, res) => {
    const userInfo = req.body
    //这里已经有了全局检测中间件，所以下面if可以去掉！！！
    //判断用户名是否为空！
    /* if (!userInfo.username) {
        res.send({
            status: 1,
            message: '用户名不能为空！'
        })
    } */
    //判断密码是否为空！
    /* if (!userInfo.password) {
        res.send({
            status: 1,
            message: '密码不能为空！'
        })
    } */

    //检测用户名是否被占用
    const SqlString = `select * from ev_users where username=?`
    db.query(SqlString, [userInfo.username], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }

        // 用户名被占用
        /* if (results.length > 0) {
            return res.send({
                status: 1,
                message: '用户名被占用，请更换其他用户名！'
            })
        } */
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }

        // TODO: 用户名可用，继续后续流程...
        // 在注册用户的处理函数中，确认用户名可用之后，调用 bcrypt.hashSync(明文密码, 随机盐的长度) 方法，对用户的密码进行加密处理
        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        //定义插入用户的 SQL 语句
        const sql = 'insert into ev_users set ?'
        db.query(sql, {
            username: userInfo.username,
            password: userInfo.password
        }, (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.send({
                status: 1,
                message: err.message
            })
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册成功
            res.cc('注册成功！', 0)
        })
    })

}

//登录处理函数
exports.login = (req, res) => {
    const userInfo = req.body //接收表单数据
    const sql = `select * from ev_users where username=?` //定义 SQL 语句

    //执行 SQL 语句，查询用户的数据：
    db.query(sql, userInfo.username, (err, results) => {
        if (err) return res.cc(err) // 执行 SQL 语句失败
        if (results.length !== 1) return res.cc('登录失败，您还没有注册账户！') // 执行 SQL 语句成功，但是查询到数据条数不等于 1

        // TODO：判断用户输入的登录密码是否和数据库中的密码一
        //调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致
        //  返回值是布尔值（ true 一致、 false 不一致）
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)

        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('密码错误，登录失败！')
        }

        // TODO：登录成功，生成 Token 字符串
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = {
            ...results[0],
            password: '',
            user_pic: ''
        }

        // 将用户信息对象加密成 Token 字符串：生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn, // token 有效期为 10 个小时
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })
    })
}