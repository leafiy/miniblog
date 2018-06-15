const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  devServer: {
    open: false,
    port: 8040,
    https: false,
    hotOnly: false,
    bonjour: true,
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