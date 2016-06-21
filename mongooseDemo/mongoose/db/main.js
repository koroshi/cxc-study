var mongoose = require('mongoose');
var log4js = require('log4js');
var log = log4js.getLogger("db");

var uri = 'mongodb://localhost/guidTest';

mongoose.connect(uri);
//mongoose.connect 'mongodb://localhost/meeting'
wechatDB = mongoose.connection;

wechatDB.on("disconnected",function(){
    log.info('disconnected');
    setTimeout(connectAgain,10000);
});


wechatDB.on("error",function(err){
    log.error(err);
})

wechatDB.on("open",function(){
    log.info('open');
});


wechatDB.on("close",function(){
    log.info('close');
});

wechatDB.on("reconnected",function(){
    log.info('reconnected');
});

var connectAgain = function(){
    log.info('reconnecting......');
    mongoose.connect(uri);
};

module.exports = wechatDB;
//setTimeout(connectAgain,3000);
