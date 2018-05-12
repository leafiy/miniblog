const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
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
  productionSourceMap: false,
  configureWebpack: config => {

    return {
      entry: {
        'mavon-editor': ['mavon-editor']
      }
    }
  }
}