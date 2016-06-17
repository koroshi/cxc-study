var User = require('../models/user');
var Promise = require('bluebird');
var jwt = require("jsonwebtoken");
var SECRET = 'CXL';
var UserCtl = {};

// authenticate
var checkUserBase = function(postUser){
	return new Promise(function(resolve, reject){
		 User.findOne({email: postUser.email, password: postUser.password}, function(err, user) {
		 	if(err) return reject(err);
		 	if(user) {
		 		return resolve(user);
		 	} else{
		 		return resolve({postUser:postUser});
		 	}
	
		 	// return reject(new Error('Incorrect email/password'));
		 });
	});
};

var checkLogin = function(user) {
	if(!user.postUser) return Promise.resolve(user);
	return Promise.reject(new Error('Incorrect email/password'));
};
UserCtl.authenticate = function(postUser){
	return checkUserBase(postUser).then(checkLogin);
};


// sign
var createUser = function(postUser){
	return new Promise(function(resolve,reject){
	    var userModel = new User();
	    userModel.email = postUser.email;
	    userModel.password = postUser.password;
	    userModel.save(function(err, user){
	    	if(err) return reject(err);
	    	return resolve(user);
	    });
	});
};

var tokendUser = function(user){
	return new Promise(function(resolve, reject){
		user.token = jwt.sign(user,SECRET);
		user.save(function(err,tokendUser){
			if(err) return reject(err);
			return resolve(tokendUser);
		});
	})
};

var checkSignIn = function(user) {
	if(!user.postUser) return Promise.reject(new Error('User already exists!'));
	return createUser(user.postUser).then(tokendUser);
};



UserCtl.signIn = function(postUser) {
	return checkUserBase(postUser).then(checkSignIn);
};

UserCtl.ensureAuthorized = function(req,res,next){
 	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
	if (token) {
    	// 确认token
    	if(req.headers['authorization']) {
	    	var bearerHeader = req.headers["authorization"];
    		var bearer = bearerHeader.split(" ");
    	      token = bearer[1];
    	}

    	jwt.verify(token, SECRET, function(err, decoded) {
	      if (err) {
	        return res.json({ success: false, message: 'token信息错误.' });
	      } else {
	        // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
	        req.api_user = decoded;
	        console.dir(req.api_user);
	        next();
	      }
    	});
  	} else {
    	// 如果没有token，则返回错误
    	return res.status(403).send({
        success: false,
        message: '没有提供token！'
    });
  }
}

module.exports = UserCtl;