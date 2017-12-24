var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var uploadSchema = new Schema({
  uid: String,
  originalname: String,
  mimetype: String,
  author: String,
  path: String,
  created: { type: Date, default: Date.now },
  fileType: String,
  belongTo: {
    type: Array,
    default: []
  }
});

uploadSchema.methods = {

};

uploadSchema.set('toObject');

var Upload = mongoose.model('Upload', uploadSchema);

var Promise = require('bluebird');
Promise.promisifyAll(Upload);
Promise.promisifyAll(Upload.prototype);

module.exports = Upload;
