const log4js = require('log4js');
const LOG4JSCONFIG = require("../config/CONFIG").LOG4JSCONFIG;
log4js.configure(LOG4JSCONFIG.baseConf);

// log4js的输出级别6个: trace, debug, info, warn, error, fatal
const LEVEL = LOG4JSCONFIG.LEVEL;

class LocalLogger {
  constructor() {
  }
  getLogger(category) {
  	let tmpLogger = log4js.getLogger(category);
	tmpLogger.setLevel(LEVEL);
	return tmpLogger;
  }
}

// let LocalLogger = {}
// LocalLogger.getLogger = function(category){

// }

module.exports = new LocalLogger;