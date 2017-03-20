var express = require('express');
var router = express.Router();

var LocalLogger = require('../utils/LocalLogger')
var log = LocalLogger.getLogger("Routerusers");

/* GET users listing. */
router.get('/', function(req, res, next) {
  log.debug('index'+req.method)
  res.send('respond with a resource');
});

module.exports = router;
