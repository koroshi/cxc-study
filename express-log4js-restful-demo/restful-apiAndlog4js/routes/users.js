const express = require('express');
const router = express.Router();

const LocalLogger = require('../utils/LocalLogger')
const log = LocalLogger.getLogger("RouterUsers");
const User = require('../db/models/User');
const jwt = require('jsonwebtoken');
const APPCONFIG = require('../config/CONFIG').APPCONFIG;


const passport = require('passport');

require('../utils/LocalPassport');


/* GET users listing. */
router.get('/', function(req, res, next) {
  log.debug('index'+req.method)
  res.send('respond with a resource');
});




//注册账号
router.post('/signup', function(req, res, next) {
  let name = req.body.name,password = req.body.password;
  log.debug(`signup name: ${name} , password: ${password}`)
  if (!name || !password) {
    log.debug(`signup fail 请输入您的账号密码.name : ${name} , password: ${password}`)
    res.json({success: false, message: '请输入您的账号密码.'});
  } else {
    var newUser = new User({
      name: name,
      password: password
    });
    // 保存用户账号
    newUser.save((err) => {
      if (err) {
        log.debug(`signup user save err ${err}`)
        return res.json({success: false, message: '注册失败!'});
      }
      log.debug(`signup user success`)
      res.json({success: true, message: '成功创建新用户!'});
    });
  }
});


router.post('/user/accesstoken', function(req, res, next) {
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if (err) {
      log.debug(`/user/accesstoken find err ${err}`)
      throw err;
    }
    if (!user) {
      log.debug(`/user/accesstoken 认证失败,用户不存在!`)
      res.json({success: false, message:'认证失败,用户不存在!'});
    } else if(user) {
      // 检查密码是否正确
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          var token = jwt.sign({name: user.name}, APPCONFIG.SECRET,{
            expiresIn: 10080  // token到期时间设置
          });
          user.token = token;
          user.save(function(err){
            if (err) {
              log.debug(`/user/accesstoken save err ${err}`)
              res.send(err);
            }
          });
          res.json({
            success: true,
            message: '验证成功!',
            token: 'Bearer ' + token,
            name: user.name
          });
        } else {
          log.debug(`/user/accesstoken 认证失败,密码错误!`)
          res.send({success: false, message: '认证失败,密码错误!'});
        }
      });
    }
  });
});

// passport-http-bearer token 中间件验证
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.get('/users/info',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    log.debug(`/users/info ${req.user}`);
    res.json({username: req.user.name});
});


module.exports = router;
