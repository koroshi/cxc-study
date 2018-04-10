var express = require('express');
var router = express.Router();
let lock = require("../locak")
// let resource = '1'
let ttl = '10000'

let timeOut = async function (timeout) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(0)
    }, timeout);
  })
}

/* GET home page. */
router.get('/',async function(req, res, next) {
  try {
    let { resource} = req.query
    console.log("进入请求")
    let a = await lock.lock(resource, ttl)
    console.log("准备开始等待")
    await timeOut(2000)
    console.log("已经等待2秒")
    a.unlock()
  }
  catch(e) {
    console.log("wrong")
    console.log(e)
    return res.status(200).render('index', { title: 'wrong' });
  }

  return res.status(200).render('index', { title: 'Express' });
});

module.exports = router;
