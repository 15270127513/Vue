var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');

var app = express();
let router = express.Router();
let db = require('./model/db'); 

Date.prototype.format = function(format)
{
 var o = {
 "M+" : this.getMonth()+1, //month
 "d+" : this.getDate(),    //day
 "h+" : this.getHours(),   //hour
 "m+" : this.getMinutes(), //minute
 "s+" : this.getSeconds(), //second
 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
 "S" : this.getMilliseconds() //millisecond
 }
 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
 (this.getFullYear()+"").substr(4 - RegExp.$1.length));
 for(var k in o)if(new RegExp("("+ k +")").test(format))
 format = format.replace(RegExp.$1,
 RegExp.$1.length==1 ? o[k] :
 ("00"+ o[k]).substr((""+ o[k]).length));
 return format;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended:true
}))

// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", ' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

//设置跨域访问
app.use(function (req, res, next) {
  if (req.method === "OPTIONS") {
    let headers = {};
    headers["Access-Control-Allow-Origin"] = "*";

    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";

    headers["Access-Control-Allow-Credentials"] = false;

    headers["Access-Control-Max-Age"] = '86400'; // 24 hours

    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";

    res.writeHead(200, headers);

    res.end();
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
//注册接口
app.use('/register',registerRouter)

//插入测试
app.get('/dbtest',function(req, res){
    let project = {project_name: 'test', create_time: '2017-03-28 14:09:29'};
    let sqlString = 'INSERT INTO project SET ?';
    let connection = db.connection();
    db.insert(connection, sqlString, project, function(id){
        console.log('inserted id is:' + id);
    });
    db.close(connection);
	res.send(JSON.stringify(project))
    return;
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
















// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
