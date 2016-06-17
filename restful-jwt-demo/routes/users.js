var express = require('express');
var router = express.Router();
var UserCtl = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/authenticate',function(req, res, next) {
	UserCtl.authenticate({email:req.body.email, password:req.body.password})
	.then(function(user){
    	return res.json({
        	type: true,
            data: user,
            token: user.token
        }); 

	})
	.catch(function(err){
		return res.json({
			type:false,
			data:'Error:'+err.message
		});
	});

});

router.post('/signin', function(req, res, next){
	UserCtl.signIn({email:req.body.email, password:req.body.password})
	.then(function(user) {
    	return res.json({
        	type: true,
            data: user,
            token: user.token
		});
    })
	.catch(function(err){
		return res.json({
			type:false,
			data:'Error:'+err.message
		});
	});
});


router.get('/me',UserCtl.ensureAuthorized,function(req,res,next){
	if(req.api_user) {
            res.json({
                type: true,
                data: req.api_user
            });
		// res.status(200).json('整个过程正常')
	}
});

module.exports = router;
