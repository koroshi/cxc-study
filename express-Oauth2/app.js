var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var mongoose = require('mongoose');

var uristring = 'mongodb://localhost/test';

// Makes connection asynchronously. Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring);


var OAuthServer = require('express-oauth-server');
var app = express();
var LocalLog = require('./controllers/localLog');
// var session = require('express-session');

// var log4js = require('log4js');
// log4js.configure({
//   appenders: [
//     { type: 'console' }, //控制台输出
//     {
//       type: 'file', //文件输出
//       filename: 'logs/access.log', 
//       maxLogSize: 1024,
//       backups:3,
//       category: 'normal' 
//     },
//     {
//       type: 'dateFile', //文件输出
//       filename: 'logs/blah.log', 
//       pattern:"-yyyy-MM-dd",
//       MaxLogSize: 1024,
//       backups:3,
//       category: 'specail' 
//     }
//   ]
// });
var normalLogger = LocalLog.getLogger(LocalLog.categorys.NORMAL);
var specailLogger = LocalLog.getLogger(LocalLog.categorys.SPECAIL);

mongoose.connection.on("open", function () {
  normalLogger.info("dbopen");
});
// var specailLogger = log4js.getLogger('specail');
// normalLogger.setLevel('INFO');
// specailLogger.setLevel('INFO');
normalLogger.info('cc')
specailLogger.error('cc')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
let mymodel = require('./testmodel.js')
app.oauth = new OAuthServer({
  model: mymodel, // See https://github.com/oauthjs/node-oauth2-server for specification
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(async function (req, res, next) {
//   if(req.method === 'POST') {
//     normalLogger.info("456")
//     // normalLogger.info(app.oauth)
//     console.log(app.oauth.token)
//     let my = app.oauth.token()
//     console.log(my)
//     // let a = await mymodel.generateAccessToken();
//     res.json(
//       my
//     )
//   } else {
//     next();
//   }

// });
var routertmp = express.Router();
// router.get('/', ;

// routertmp.post('/', app.oauth.token());
routertmp.post('/', function name(req,res,next) {
  console.log(req.get('Authorization'));
  next();
}, app.oauth.authenticate());

app.use('/fd-data-share/oauth/token', app.oauth.token());
app.use('/fd-data-share/caseData/info', routertmp);
// app.use(app.oauth.token());
// app.use(app.oauth.authorize());

app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
//   cookie: { maxAge: 60 * 1000 }
// }));
app.use(function (req, res) {
  normalLogger.info("123")
  res.send('Secret area');
});


app.use('/', routes);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
