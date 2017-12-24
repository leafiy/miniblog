const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const siteConfig = require('./config/index')
const mongoose = require('mongoose');
const logger = require('morgan');
mongoose.Promise = global.Promise;
const db = 'mongodb://127.0.0.1/' + siteConfig.db[process.env.NODE_ENV];



logger.token('date', function() {
  var p = new Date().toString().replace(/[A-Z]{3}\+/, '+').split(/ /);
  return (p[2] + '/' + p[1] + '/' + p[3] + ':' + p[4] + ' ' + p[5]);
});

mongoose.connect(db, {
  useMongoClient: true,
});



var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function(file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

var routes = require('./routes/index');

var app = express();
app.set('port', siteConfig.port[process.env.NODE_ENV]);
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


if (process.env.NODE_ENV == "production") {

  app.use(logger('common'));
} else {
  app.use(logger('combined'))
}
routes(app);


app.listen(app.get('port'), function() {
  console.log('当前运行环境为: ' + process.env.NODE_ENV + ' / 数据库使用: ' + siteConfig.db[process.env.NODE_ENV] + ' / 后端运行端口: ' + app.get('port'))
});

module.exports = app;
