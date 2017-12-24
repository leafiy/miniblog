const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const auth = require('../auth.service');
const Article = mongoose.model('Article');
const router = express.Router();
const utils = require('../../../utils/utils')


router.post('/', function(req, res, next) {
  let errorMsg;
  if (req.body.password === '' || req.body.email === '') {
    errorMsg = 'emptyField';
  }

  if (errorMsg) {
    return res.status(401).send({ errorType: errorMsg });
  } else {
    next();
  }

}, function(req, res, next) {
  passport.authenticate('local', async function(err, user, info) {
    let expiry
    let skipActive = req.body.skipActive

    if (req.body.remember) {
      expiry = new Date();
      expiry.setDate(expiry.getDate() + 60);
    } else {
      expiry = new Date();
      expiry.setDate(expiry.getDate() + 5);
    }
    if (err) {
      return res.status(401).send();
    }
    if (info) {
      return res.status(403).send(info);
    }

    user.last_login = new Date();
    if (skipActive) {
      user.status = 2;
    }
    await user.saveAsync()

    var token = auth.signToken(user._id, expiry);

    var userInfo = user.userInfo;
    console.log(token)
    return res.json({
      token: token,
      userInfo: userInfo
    });
  })(req, res, next)
});

module.exports = router;
