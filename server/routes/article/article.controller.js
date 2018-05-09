const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const User = mongoose.model('User');
const Upload = mongoose.model('Upload');
const fs = require('fs');
const formidable = require('formidable');
const gm = require('gm');
const imageMagick = gm.subClass({ imageMagick: true });
const _ = require('lodash');
const config = require('../../config');
const utils = require('../../utils/utils')
const sanitizeHtml = require('sanitize-html');


import { getImgsFromHtml } from '../../utils/utils.js';
const xss = require('xss');


let initialArticle = [{
    name: 'about',
    content: 'about content',
  },
  {
    name: 'research',
    content: 'research content',
  }
]
_.forEach(initialArticle, async content => {
  let article = await Article.findOne({ articleType: content.name });
  if (!article) {
    Article.createAsync({
      content: content.content,
      articleType: content.name
    })
    console.log(`${content.name} add success`)
  }
})
exports.updateOrder = async function(req, res) {
  let idList = req.body;
  try {
    for (let item of idList) {
      let article = await Article.findById(item.id);
      article.index = item.index;
      article.saveAsync()

    }
    res.status(200).send({})

  } catch (error) {
    console.log(error)
    res.status(401).send({ error: error })

  }
}
exports.deleteContent = async function(req, res) {
  let id = req.params.id;
  try {
    let article = await Article.findById(id).remove().exec();
    res.status(200).send({})
  } catch (error) {
    console.log(error)
    res.status(401).send({ error: error })
  }
}
exports.createArticle = async function(req, res) {
  let content = req.body;
  if (content.title) {
    content.title = content.title.trim();
    let article = await Article.find({ title: content.title, category: content.category });
    if (article.length) {
      return res.status(400).send({
        err: 'titleExist'
      })
    }

  } else {
    return res.status(400).send({
      err: 'titleEmpty'
    })
  }
  Article.createAsync(content).then(response => {

    res.status(200).send({
      content: response
    })

  }).catch(error => {
    console.log(error)
    res.status(401).send({
      error: error
    })
  })

}
exports.getContentByName = async function(req, res) {
  let name = req.params.name;
  try {
    let content = await Article.findOne({ shortName: name });
    res.status(200).send({
      content: content
    })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      error: error
    })
  }
}
exports.getContentById = async function(req, res) {
  let id = req.params.id;
  try {
    let content = await Article.findById(id);
    res.status(200).send({
      content: content
    })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      error: error
    })
  }
}
exports.getContent = async function(req, res) {
  let name = req.params.name && req.params.name.toLowerCase();
  let query = {}
  if (name) {
    query.articleType = name
  } else {
    query.articleType = { $ne: 'article' }
  }

  try {
    let content = await Article.find(query);
    res.status(200).send(content)
  } catch (error) {
    console.log(error)
    res.status(401).send({
      error: error
    })
  }
}
exports.getArticleList = async function(req, res) {
  let category = req.params.category;
  category = category.toLowerCase();
  try {
    let articleList = await Article.find({ articleType: 'article', category: category }).sort('-created');

    articleList.sort(function(a, b) {
      var x = a['index'];
      var y = b['index'];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    res.status(200).send({
      articleList: articleList
    })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      error: error
    })
  }
}
exports.updateContent = async function(req, res) {
  let name = req.body.articleType
  let article = await Article.findOne({ articleType: name })
  if (article) {
    let query = { _id: article.id }
    Article.findOneAndUpdate(query, req.body, { upsert: true, new: true }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).send({ error: err })
      }
      return res.status(200).send(doc)
    })
  } else {
    Article.createAsync(req.body)
    return res.status(200).send({ ok: true })
  }


}
