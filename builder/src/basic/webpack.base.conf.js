'use strict';
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const utils = require('../utils');
const config = require(utils.rootPath('env.param.config'));
const rules = require("./webpack.rules.conf.js");

module.exports = {
  context: utils.rootPath(''),//path.resolve(__dirname, '../')
  entry: utils.getPropertyByEnv('entry'),
  output: {
    path: utils.getPropertyByEnv('assetsRoot'),
    filename: '[name].js',
    publicPath: utils.getPropertyByEnv('assetsPublicPath')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: utils.getAliasPathConfig()
  },
  module: {
    rules: [...rules]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
