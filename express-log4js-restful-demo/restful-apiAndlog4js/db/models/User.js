const mongoose = require('mongoose');
var exprotDB = require('../main');
const UserSchema = require('../schemas/userSchema');
module.exports = exprotDB.model('User', UserSchema,'User');