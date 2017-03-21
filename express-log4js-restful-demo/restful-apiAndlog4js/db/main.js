const mongoose = require('mongoose');
let LocalLogger = require('../utils/LocalLogger')
let log = LocalLogger.getLogger("dbMain");
mongoose.Promise = global.Promise;

let DBCONFIG = require('../config/CONFIG').DBCONFIG;

let uri = DBCONFIG.SERVICE;

mongoose.connect(uri);

let exprotDB = mongoose.connection;

exprotDB.on("disconnected",function(){
    log.info('disconnected');
    setTimeout(connectAgain,10000);
});


exprotDB.on("error",function(err){
    log.error(err);
})

exprotDB.on("open",function(){
    log.info('open');
});


exprotDB.on("close",function(){
    log.info('close');
});

exprotDB.on("reconnected",function(){
    log.info('reconnected');
});

var connectAgain = function(){
    log.info('reconnecting......');
    mongoose.connect(uri);
};

module.exports = exprotDB;