const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');
const Upload = mongoose.model('Upload');
const fs = require('fs');
const _ = require('lodash');
const mkdirp = require('mkdirp');
const config = require('../config/index.js')
const path = require('path')






var covertFilename = function(originUrl, size) {
  if (!originUrl) {
    return false
  }

  if (!size) {
    return originUrl;
  }
  size = size.toString();
  size = '_' + size
  if (Array.isArray(originUrl)) {
    var arr = []
    _.each(originUrl, function(url) {
      url = url.replace(/(\.[\w\d_-]+)$/i, size + '$1');
      arr.push(url)
    })
    return arr;
  } else {
    return originUrl.replace(/(\.[\w\d_-]+)$/i, size + '$1');

  }
};
exports.covertFilename = covertFilename;

