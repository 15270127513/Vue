let mysql = require('mysql');
let db = {}


var arr = [];
//查询操作
db.query1 = function (connection, sql, paras, callback){
let result = connection.query(sql,paras,function(error, results, fields){
    if (error) {
        console.log(error)
    }
    else{
        let flag = 0;
        for (var i = 0; i < results.length; i++) {
            if(results[i].user_name == paras.username){
                flag =1;   
                break; 
            }
        }
        callback(flag)
    }
})
}
//插入操作，注意使用异步返回查询结果
db.insert = function (connection, sql, paras, callback) {
    let result = connection.query(sql, paras, function (error, results, fields) {
        // if (error) throw error;
        // callback(results.insertId);//返回插入的id
        if (error) {
            console.log(error)
        } else {
            // console.log(results);
            for (var i = 0; i < results.length; i++) {
                arr[i] = results[i].name;
            }
            callback(results);
            // app.get('/', function (req, res) {
            //     res.send(arr);  //这里必须用res.send,因为有数据返回到客户端
            // })
        }
    });
}

//关闭数据库
db.close = function (connection) {
    //关闭连接
    connection.end(function (err) {
        if (err) {
            return;
        } else {
            console.log('关闭连接');
        }
    });
}

//获取数据库连接
db.connection = function () {
    //数据库配置
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'PointSystem',
        port: 3306
    });
    //数据库连接
    connection.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    return connection;
}
module.exports = db;