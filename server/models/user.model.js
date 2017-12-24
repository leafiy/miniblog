const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');


var userSchema = new Schema({
  email: { type: String, lowercase: true },
  hashedPassword: String,
  salt: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now },
  activeCode: { type: String }
});

userSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });
userSchema
  .virtual('activation')
  .set(function() {
    this.activeCode = this.makeCode();
  })
  .get(function() {
    return this.activeCode;
  });

userSchema
  .virtual('authInfo')
  .get(function() {
    return {
      'id': this._id,
      'email': this.email,
      'last_login': this.last_login,
      'created': this.created,
    };
  });

userSchema
  .virtual('userInfo')
  .get(function() {
    return {
      'id': this._id,
      'email': this.email,
    };

  });






userSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
    };
  });


userSchema.methods = {
  //验证用户密码
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
  //生成盐
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },
  //生成密码
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
  },
  makeCode: function() {
    return crypto.randomBytes(8).toString('base64');
  }
};

userSchema.set('toObject', { virtuals: true });

var User = mongoose.model('User', userSchema);

var Promise = require('bluebird');
Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);

module.exports = User;