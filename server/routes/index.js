const path = require('path');
const siteConfig = require('../config/index')
const apiPerfix = '/api/v1'
const domain = siteConfig.domain[process.env.NODE_ENV]

module.exports = function(app) {
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", domain);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    return next();
  });

  app.use(apiPerfix + '/auth', require('./auth/index'));
  app.use(apiPerfix + '/user', require('./user/index'));
  app.use(apiPerfix + '/article', require('./article/index'));
  app.use(apiPerfix + '/uploader', require('./uploader/index'));
  app.use(apiPerfix + '/*', function(req, res, next) {
    return res.status(404).send({ errorMsg: 'notFound', errorType: '404' });
  })
};