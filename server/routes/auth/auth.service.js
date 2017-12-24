const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');


const signToken = function(id, expiry) {
  if (!expiry) {
    console.log('no expiry provided')
    return new Error({ errorType: 'noExpiryTime' })
  }
  if (Object.prototype.toString.call(expiry) === '[object Date]') {
    expiry = expiry.getTime() / 1000
  }
  return jwt.sign({
    id: id,
    exp: parseInt(expiry)
  }, config.session.secrets);
};

exports.signToken = signToken;
