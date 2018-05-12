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
import shortName from '../../utils/shortName.js'
import mdHandler from '../../utils/md.js'

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
exports.getArticle = async function(req, res) {
  let title = req.params.title
  Article.findOne({ shortName: new RegExp(title, 'i') }).then(article => {
    article = article.articleInfo
    article = mdHandler(article)
    res.status(200).send({
      article: article
    })
    Article.findByIdAndUpdate(article._id, { $inc: { pv: 1 } }).exec()

  }).catch(err => {
    console.log(err)
    res.status(400).send({
      err: 'NotFound'
    })
  })
}
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
exports.updateArticle = async function(req, res) {
  let newArticle = req.body
  let id = newArticle._id
  let article = await Article.findById(id)
  article.updated = new Date()
  newArticle.shortName = shortName(article.title)
  article = Object.assign(article, newArticle)
  Article.find({ shortName: article.shortName, _id: { $ne: id } }).then(data => {
    if (data.length > 1) {
      res.status(400).send({
        err: 'titleExist'
      })
    } else {
      article.saveAsync()
      res.status(200).send({
        content: article
      })
    }
  })

}
exports.getArticleByTag = async function(req, res) {
  let tag = req.params.tag
  let articleList = await Article.find({ tags: tag })
  res.status(200).send({
    articleList: articleList
  })
}

exports.createArticle = async function(req, res) {
  let content = req.body;
  if (content.title) {
    content.title = content.title.trim();
    content.shortName = shortName(content.title)
    let article = await Article.find({ shortName: content.shortName, category: content.category });
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
  let isDraft = req.params.isDraft
  category = category.toLowerCase();
  let query = {
    articleType: 'article',
    category: category
  }
  if (!isDraft) {
    query.isDraft = false
  }
  try {
    let articleList = await Article.find(query).sort('-created');

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


exports.setAsDraft = async function(req, res) {
  let id = req.body.id
  let article = await Article.findById(id)
  if (!article) {
    return res.status(400).send('article not found')
  }
  article.isDraft = true
  article.saveAsync()
  res.status(200).send({
    article: article
  })
}

exports.cancleDraft = async function(req, res) {
  let id = req.body.id
  let article = await Article.findById(id)
  if (!article) {
    return res.status(400).send('article not found')
  }
  article.isDraft = false
  article.saveAsync()
  res.status(200).send({
    article: article
  })
}
