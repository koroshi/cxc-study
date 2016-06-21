var mongoose = require('mongoose');
var wechatDB = require('../main');
// var Promise = require("bluebird");
var _ = require('lodash');
var PointSchema = new mongoose.Schema({
    name:String,
    x:Number,
    y:Number,
    floor:Object,
    layer:{
    	type:mongoose.Schema.ObjectId,
    	ref:'Layer'
    }
});

  // booker:{type:Schema.ObjectId, ref :'User'}
 // users : [{ type: Schema.ObjectId, ref: 'User' }]
module.exports = Point = wechatDB.model('Point',PointSchema,'Point');