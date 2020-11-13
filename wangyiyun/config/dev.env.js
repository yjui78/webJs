'use strict'
const path = require('path');
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    compress: true,
    port: 3333,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080',
    }
  }
})
