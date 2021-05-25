var express = require('express');
var db = require('../model/db')
var router = express.Router();

/* GET register listing. */
//req request 请求 问
//res response
router.get('/', function(req, res, next) {
  
  let inform = req.query
  let username = inform.newusername
  let password = inform.newpassword
  let result = {
    state:'success',
    message:"注册成功，你的用户名: "+username + "\n" + "你的密码是:" + password
  }
  res.send(result)
});

router.post('/', function(req, res, next) {
  console.log(9999)
  let inform = req.body.params;
  let username = inform.newusername;
  let password = inform.newpassword;
  console.log(88888)
  let existUserSQL = 'select user_name from users';
  let conn = db.connection()
  console.log(7777)
  db.query1(conn,existUserSQL,{username:username},function(resx){
    console.log(345)
    if(resx){
      res.send("重名了")
    }else{
      res.send("用户名可以用")
    }
  });
  db.close(conn)



  // let newUserSQL = 'INSERT INTO USERS (user_id,user_name,user_password,user_create_time) VALUES(1002,' +'"'+ username+'"' + ',' +'"'+ password +'"' +',' +'"' + new Date().format('yyyy-MM-dd hh:mm:ss') + '"' + ')' 
  // let conn = db.connection()
  // // let result = {}
  // db.insert(conn,newUserSQL,'',function(resx){
  //   let result = resx;
  //   if(resx.insertId ==0 ){
  //     result.state="success"
  //   }
  //   else{
  //     result.state= "failed"
  //   }
  //   // console.log(result)
  //   res.send(result);
  // })
  // db.close(conn)

  

});


module.exports = router;
