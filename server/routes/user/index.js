const express = require("express");
const controller = require('./user.controller');
const expressJwt = require('express-jwt');
const config = require('../../config');

const router = express.Router();
router.post('/addUser', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.addUser);
router.post('/forgotPassword', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.forgotPassword);
router.post('/logout', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.logout);
router.post('/checkExist', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.checkExist)
router.post('/resendActiveEmail', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.resendActiveEmail)
router.post('/emailActivation', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.emailActivation)
router.post('/skipEmailActivation', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.skipEmailActivation)
router.post('/profileSettings', expressJwt({
  secret: config.session.secrets,
  credentialsRequired: true
}), controller.profileSettings)

router.get('/set', expressJwt({ secret: config.session.secrets }), controller.userSet);
router.get('/:id/userInfo', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.userInfo);
router.post('/header', expressJwt({ secret: config.session.secrets }), controller.header);
router.put('/updateUser', expressJwt({ secret: config.session.secrets }), controller.updateUser);
router.put('/updatePassword', expressJwt({ secret: config.session.secrets }), controller.updatePassword);

module.exports = router;
