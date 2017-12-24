const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');
const Upload = mongoose.model('Upload');
const fs = require('fs');
const _ = require('lodash');
const mkdirp = require('mkdirp');
const config = require('../config/index.js')
const path = require('path')


const toCamelCase = str =>
  str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) => p2 ? '_' + p2.toLowerCase() : p1.toLowerCase());
exports.toCamelCase = toCamelCase;


const removeSpecialChars = str => {
  return str.replace(/(?!\w|\s)./g, '')
    .replace(/\s+/g, ' ')
    .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
}
exports.removeSpecialChars = removeSpecialChars;

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
