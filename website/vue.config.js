const path = require('path')
module.exports = {
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8040,
    https: false,
    hotOnly: false,
    bonjour: true,
    public: "0.0.0.0",
    allowedHosts: ['qiansmile.local'],
    proxy: null, // string | Object
    before: app => {
      // app is an express instance
    }
  },
  productionSourceMap:false
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'development') {
  //     return {
  //       resolve: {
  //         alias: {
  //           'myvueui': path.resolve(__dirname, './myvueui'),
  //           'wangeditor': path.resolve(__dirname, './wangEditor')
  //         }
  //       }
  //     }
  //   } else {

  //   }
  // }
}
