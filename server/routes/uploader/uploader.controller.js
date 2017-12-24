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
//const fileType = require('file-type');

exports.upload = function(req, res, err) {

  let file = req.files[0];
  let author = req.user.id;
  let fileType = req.body.fileType || '';
  try {
    let newUpload = new Upload(file);
    newUpload.author = author;
    newUpload.fileType = fileType;
    newUpload.saveAsync();
    let fileObj = {
      errno: 0,
      data: ['/' + newUpload.path]
    }
    renderThumbnail(newUpload, () => {
      res.status(200).send(fileObj);
    })

    return
  } catch (err) {
    console.log(err)
    return res.status(501).send({
      err: err
    })
  }
}

const renderThumbnail = (upload, cb) => {
  let filePath = upload.path;
  let type = upload.originalname.split('.').pop().toLocaleLowerCase() || '';

  if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(type) > -1) {
    var thumb = utils.covertFilename(filePath, 'sm');
    gm(filePath).resize(420, null).noProfile().write(thumb, function(err) {
      if (err) {
        console.log(err)
      } else {
        cb()
      }
    })
  }
}
