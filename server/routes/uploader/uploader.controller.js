const mongoose = require('mongoose');
const Upload = mongoose.model('Upload');
const fs = require('fs');
const gm = require('gm');
const imageMagick = gm.subClass({ imageMagick: true });
const _ = require('lodash');
const config = require('../../config');
const utils = require('../../utils/utils');
const crypto = require('crypto');
const mkdirp = require('mkdirp');
const readChunk = require('read-chunk');
const sharp = require('sharp')
const host = config.domain[process.env.NODE_ENV]
//const fileType = require('file-type');
exports.upload = function(req, res, err) {
  let file = req.files[0];
  let author = req.user.id;
  let newUpload = new Upload(file);
  newUpload.author = author;
  newUpload.saveAsync();
  renderThumbnail(newUpload).then(url => {
    res.status(200).send(url)
  })

}

const renderThumbnail = (upload, cb) => {
  return new Promise((resolve, reject) => {
    let filePath = upload.path;
    let type = upload.originalname.split('.').pop().toLocaleLowerCase() || '';
    if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(type) > -1) {
      var thumb = utils.covertFilename(filePath, 'sm');
      sharp(filePath).resize(500).toFile(thumb).then(_ => {
        resolve(`${host}/${upload.path}`)
      }).catch(err => {
        console.log('renderThumbnail err:' + err)
        reject(err)
      })
    }
  })

}
