'use strict';
const webpack = require('webpack');
/**
 * 如果 vue-loader 的版本在v15以上，还需要额外配置VueLoaderPlugin
 * 因 vue-loader 版本在 v15以上运行报错 ：Cannot find module 'vue-template-compiler'，且配置 new VueLoaderPlugin()无效。
 * 故而降低 vue-loader 版本至 14.2.2
 *
 * 若Vue版本：
 * < 2.6 则 使用 vue-loader 的版本在v15以下 （14.2.2)
 * >= 2.6 则 使用 vue-loader 的版本在v15以上 （15.7.1)，且配置 new VueLoaderPlugin()
 */
// const { VueLoaderPlugin } = require("vue-loader");
// 设置了extract：true，所以还需要在plugins中引入，否则会报错
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const SvgSpriteLoader = require('svg-sprite-loader/plugin');
const WebpackBar = require('webpackbar'); //webpack 构建编译进度条 插件

const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const utils = require('../utils');
const config = require('../config');
const rules = require('./webpack.rules.conf.js');

const baseWebpackConfig = {
  context: utils.rootPath(''), //path.resolve(__dirname, '../')
  entry: utils.getPropertyByEnv('entry'),
  output: {
    path: utils.getPropertyByEnv('assetsRoot'),
    filename: '[name].js',
    publicPath: utils.getPropertyByEnv('assetsPublicPath'),
  },
  resolve: {
    //指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
    extensions: config.base.extensions,
    //配置别名可以加快webpack查找模块的速度
    alias: config.base.alias,
  },
  module: {
    rules: [...rules],
  },
  plugins: [
    new VueLoaderPlugin(),

    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happy-babel-loader',
      //如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: 'babel-loader?cacheDirectory=true',
        },
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: false,
      //启用debug 用于故障排查。默认 false。
      debug: false,
    }),

    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
    }),

    new SvgSpriteLoader(),
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
    child_process: 'empty',
  },
};

const isProd = process.env.NODE_ENV === 'production';

/**
 * 处于打包构建prod模式下，需要加入构建编译进度条
 */
if (isProd) {
  baseWebpackConfig.plugins.push(
    //webpack 构建编译进度条 插件
    new WebpackBar()
  );
}
module.exports = baseWebpackConfig;
