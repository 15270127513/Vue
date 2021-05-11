var express = require('express');
var router = express.Router();

/* GET register listing. */
router.get('/', function(req, res, next) {
  let inform = req.query;
  let username = inform.newusername;
  let password = inform.newpassword;
  let result = "恭喜你注册成功了，你的用户名:" + username + "\n" + "你的密码是："+ password;
  res.send(result)
});

router.post('/', function(req, res, next) {
  let inform = req.body;
  // console.log(inform)
  let username = inform.params.newusername;
  let password = inform.params.newpassword;
  let result = "恭喜你注册成功了，你的用户名:" + username + "\n" + "你的密码是："+ password;
  res.send(result)
  });

module.exports = router;
