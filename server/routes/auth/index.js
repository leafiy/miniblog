const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');
const auth = require('./auth.service');
const siteConfig = require('../../config/index');
const utils = require('../../utils/utils')
const secret = siteConfig.session.secrets;

require('./local/passport').setup(User);

const router = express.Router();

router.use('/local', require('./local'));


router.post('/token', async function(req, res, next) {
  let token = req.headers && req.headers.authorization && req.headers.authorization.toString();
  try {
    token = token.replace('Bearer ', '');
  } catch (err) {
    return res.status(401).send({ errorType: 'invaildToken' });
  }
  if (!token || typeof token !== 'string') {
    return res.status(401).send({ errorType: 'invaildToken' });
  }
  let now = parseInt(Date.now() / 1000);

  try {
    let decoded = jwt.verify(token, secret);
    let userId = decoded.id;
    let exp = decoded.exp;
    if (exp < now) {
      return res.status(401).send({ errorType: 'authRefused', reason: 'tokenExpired' });
    }
    let newToken = auth.signToken(userId, exp);
    let user = await User.findByIdAsync(userId);
    user = user.userInfo
    res.status(200).send({
      token: newToken,
      userInfo: user
    })



  } catch (err) {
    console.log(err)
    return res.status(401).send({ errorType: 'authRefused' });
  }


})




module.exports = router;
