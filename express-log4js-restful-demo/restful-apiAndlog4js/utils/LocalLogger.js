const log4js = require('log4js');
const LOG4JSCONFIG = require("../config/log/LOG4JSCONFIG");
log4js.configure(LOG4JSCONFIG.baseConf);

// var normalLogger = log4js.getLogger('normal');
// var specailLogger = log4js.getLogger('specail');
// normalLogger.setLevel('INFO');
// specailLogger.setLevel('INFO');
// normalLogger.info('aa')
// specailLogger.info('aa')

// log4js的输出级别6个: trace, debug, info, warn, error, fatal
const LEVEL = LOG4JSCONFIG.LEVEL;

let LocalLogger = {}
LocalLogger.getLogger = function(category){
	let tmpLogger = log4js.getLogger(category);
	tmpLogger.setLevel(LEVEL);
	return tmpLogger;
}

module.exports = LocalLogger;