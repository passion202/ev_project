//TODO：模块导入
const mysql = require('mysql') //导入数据库模块

//TODO：创建链接数据库
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})

//TODO：共享数据库模块
module.exports = db