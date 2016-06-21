var mongoose = require('mongoose');
var wechatDB = require('../main');
// var Promise = require("bluebird");
var _ = require('lodash');
var LayerSchema = new mongoose.Schema({
    name:"string",
    url:''
});

module.exports = Layer = wechatDB.model('Layer',LayerSchema,'Layer');