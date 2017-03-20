var express = require('express');
var router = express.Router();

var LocalLogger = require('../utils/LocalLogger')
var log = LocalLogger.getLogger("Routerindex");

/* GET home page. */
router.get('/', function(req, res, next) {
  log.debug('route index')
  log.info('route index')
  console.log('route index')
  res.render('index', { title: 'Express' });
});

module.exports = router;
