const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let LocalLogger = require('../../utils/LocalLogger');
let log = LocalLogger.getLogger("schemasUserSchema");
const LocalCrypto = require('../../utils/LocalCrypto');

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true, // 不可重复约束
    require: true // 不可为空约束
  },
  password: {
    type: String,
    require: true // 不可为空约束
  },
  token: {
    type: String
  }
});

// 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
UserSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
    	let hashedPassword = LocalCrypto.cryptoMd5Hash(this.password);
    	log.debug(`hashedPassword: ${hashedPassword} ,password: ${this.password}`);
    	this.password = hashedPassword;
    	next();
    } else {
        return next();
    }
});

// 校验用户输入密码是否正确
UserSchema.methods.comparePassword = function(passw, cb) {
	let isMatch = LocalCrypto.cryptoMd5HashVerify(passw,this.password);
	cb(null, isMatch);
};

module.exports =  UserSchema;