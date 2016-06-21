var mongoose = require('mongoose');
var wechatDB = require('../main');
var Promise = require("bluebird");
var _ = require('lodash');
var QrcodeSchema = new mongoose.Schema({
    name:"string",
    url:''
});

var weChatConfig = require("../../config/weChatConfig.json");
var WechatAPI = require('wechat-api');
var api = new WechatAPI(weChatConfig.APPID, weChatConfig.APPSECRET);

var ERROR_IS_EXIST = "二维码已存在";

QrcodeSchema.set('toJSON', { getters: true, virtuals: true });

/**
 * qrcodeModel的保存之前处理判断是否数据库已存在
 * @param {Function} 通知save是否报错的回调
 */
QrcodeSchema.pre('save',function(next){
    var name =  this.name;
    var self = this;
    this.model('Qrcode').find({name:name},function(err, doc){
        if(doc.length >0) {
            var err = new Error(ERROR_IS_EXIST);
            return next(err);
        } else{
            api.createLimitQRCode(name, function(err,result){
                if(err) return next(err);
                console.log('dd')
                console.log(result)
                var url = api.showQRCodeURL(result.ticket);
                console.log(url)
                self.url = url;
                return next();

            });
        }
    });
});



var KEYS = ['id','url','name'];

/**
 * qrcodeModel的创建二维码方法,
 * @param {Objcet} 一个Model的实例
 * @param {Function} 创建之后的回调
 */
QrcodeSchema.static('createQrcode', function (doc, callback) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.create(doc,function(err, qrcode, numAffected){
            if(err && err.message === ERROR_IS_EXIST) {
                self.find({name:doc.name},function(err, qrcode, numAffected){
                    if(err) return reject(err);
                    return resolve(_.pick(qrcode[0].toJSON(),KEYS));
                });
            } else {
                if(err) return reject(err);
                return resolve(_.pick(qrcode.toJSON(),KEYS));
            }
        });
    });
});


module.exports = Qrcode = wechatDB.model('Qrcode',QrcodeSchema,'Qrcode');

