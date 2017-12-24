var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var Upload = require('./upload.model.js')
var UploadSchema = mongoose.model('Upload').schema

var articleSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  articleType: {
    type: String,
    default: 'article'
  },
  shortName: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  location: {
    type: Object,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  intro: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  fileList: {
    type: Array,
    default: []
  },
  tags: {
    type: Array,
    default: []
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    default: ''
  },
  index: Number,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  pv: { type: Number, default: 0 },
  isDraft: {
    type: Boolean,
    default: false
  }
});


var Article = mongoose.model('Article', articleSchema);

var Promise = require('bluebird');
Promise.promisifyAll(Article);
Promise.promisifyAll(Article.prototype);

module.exports = Article;
