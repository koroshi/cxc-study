var mongoose = require('mongoose');
var wechatDB = require('../main');
// var Promise = require("bluebird");
var _ = require('lodash');
var PathSchema = new mongoose.Schema({
    // name:String,
    from:{
		type:mongoose.Schema.ObjectId,
		ref:'Point'
    },
    to:{
    	type:mongoose.Schema.ObjectId,
		ref:'Point'
    },
    path:[{
    	type:mongoose.Schema.ObjectId,
		ref:'Point'
    }],
    layers:[{
        type:mongoose.Schema.ObjectId,
		ref:'Layer'	
    }]
});

module.exports = Path = wechatDB.model('Path',PathSchema,'Path');