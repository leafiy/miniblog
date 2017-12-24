var express = require("express");
var controller = require('./article.controller');
var expressJwt = require('express-jwt');
var config = require('../../config');

var router = express.Router();
router.delete('/deleteContent/:id', expressJwt({ secret: config.session.secrets, credentialsRequired: true }), controller.deleteContent);
router.post('/updateOrder', expressJwt({ secret: config.session.secrets, credentialsRequired: true }), controller.updateOrder);
router.post('/createContent', expressJwt({ secret: config.session.secrets, credentialsRequired: true }), controller.createContent);
router.get('/getContent/:name', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.getContent);
router.get('/getContentById/:id', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.getContentById);
router.get('/getList/:type', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.getList);
router.put('/updateContent', expressJwt({ secret: config.session.secrets, credentialsRequired: true }), controller.updateContent);



module.exports = router;
