const express = require("express");
const controller = require('./uploader.controller');
const expressJwt = require('express-jwt');
const config = require('../../config');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const mkdirp = require('mkdirp');
const path = require('path');

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let fileType = req.body.fileType || ''
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let hash = crypto.createHash('md5');
    let folder = '' + year + month
    hash.update(folder);
    let dest = 'uploads/' + hash.digest('hex');

    mkdirp(dest, function(err) {
      if (err) {
        console.log(err)
      }
      cb(null, dest)
    });

  },
  filename: function(req, file, cb) {
    var hash = crypto.createHash('md5');

    var fileFormat = (file.originalname).split(".");
    hash.update(file.fieldname + '-' + Date.now());
    cb(null, hash.digest('hex') + '.' + fileFormat[fileFormat.length - 1])
  }
})



let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 40
  }
});


router.post('/upload', upload.any(), expressJwt({ secret: config.session.secrets, credentialsRequired: true }), controller.upload);


module.exports = router;