const crypto = require('crypto');
const LocalLogger = require('../utils/LocalLogger')
const log = LocalLogger.getLogger("untilLocalCrypto");

class LocalCrypto {
  constructor() {
  }

  cryptoMd5Hash(content) {
  	let md5 = crypto.createHash('md5');
  	md5.update(content);
  	let sign = md5.digest('hex');
  	return sign;
  }

  cryptoMd5HashVerify(content,sign) {
  	let verifysign = crypto.createHash('md5').update(content, 'utf8').digest("hex");
  	let verifyResult = verifysign === sign;
  	log.debug(`cryptoMd5HashVerify content: ${content} ,sign: ${sign} ,verifyResult: ${verifyResult}`);
  	return verifyResult;
  }
}

module.exports = new LocalCrypto;