var express = require("express");
var controller = require('./article.controller');
var expressJwt = require('express-jwt');
var config = require('../../config');

var router = express.Router();
router.delete('/deleteContent/:id', expressJwt({ secret: config.session.secrets, credentialsRequired: true }), controller.deleteContent);
router.post('/updateOrder', expressJwt({ secret: config.session.secrets, credentialsRequired: true }), controller.updateOrder);
router.post('/createArticle', expressJwt({ secret: config.session.secrets, credentialsRequired: true }), controller.createArticle);
router.get('/getAllContent', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.getContent);
router.get('/getContent/:name', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.getContent);
router.get('/getArticleByTag/:tag', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.getArticleByTag);
router.get('/getContentByName/:name', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.getContentByName);
router.get('/getArticle/:title', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.getArticle);
router.get('/getContentById/:id', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.getContentById);
router.get('/getArticleList/:category/:isDraft', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.getArticleList);
router.get('/getArticleList/:category', expressJwt({ secret: config.session.secrets, credentialsRequired: false }), controller.getArticleList);
router.put('/updateContent', expressJwt({ secret: config.session.secrets, credentialsRequired: true }), controller.updateContent);
router.put('/setAsDraft', expressJwt({ secret: config.session.secrets, credentialsRequired: true }), controller.setAsDraft);
router.put('/cancleDraft', expressJwt({ secret: config.session.secrets, credentialsRequired: true }), controller.cancleDraft);
router.put('/updateArticle', expressJwt({ secret: config.session.secrets, credentialsRequired: true }), controller.updateArticle);



module.exports = router;
