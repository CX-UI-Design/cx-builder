'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const cleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const utils = require('../utils');
const config = require(utils.rootPath('env.param.config'));
const baseWebpackConfig = require('../basic/webpack.base.conf');


// const env = require('../../config/' + process.env.env_config + '.env');

const env = require(utils.rootPath('env.config'))[
  process.env.NODE_ENV === 'testing' ? 'test_env' : 'prod_env'
  ];


const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',// 通过 mode 声明生产环境
  module: {},
  entry: config.plugin.entry || baseWebpackConfig.entry,
  devtool: config.plugin.prodJsSourceMap ? config.plugin.devtool : false,
  output: {
    path: config.plugin.assetsRoot,
    publicPath: config.plugin.assetsPublicPath,
    filename: `${config.plugin.outputFilename}.min.js`,
    library: config.plugin.outputLibrary,
    libraryTarget: 'umd'
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),

    //删除dist目录
    new cleanWebpackPlugin(['dist'], {
      root: utils.rootPath(''), //path.resolve(__dirname, '../../'), //根目录
      // verbose Write logs to console.
      verbose: true, //开启在控制台输出信息
      // dry Use boolean "true" to test/emulate delete. (will not remove files).
      // Default: false - remove files
      dry: false,
    }),

    // extract css into its own file 在打包的css文件也增加了块和hash尾缀
    new MiniCssExtractPlugin({
      filename: `${config.plugin.outputFilename}.min.css`,
    }),


    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.rootPath('./static'),//path.resolve(__dirname, '../../static'),
        to: config.plugin.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ],
  optimization: {
    /**
     * webpack4只需要设置 mode:produciton，默认optimization.minimize是true,所以js可以自动帮你打包混淆js代码.
     * 但是自定义minimizer后，webpack默认配置会取消掉,所以还需要添加 uglifyjs压缩js.
     */
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            safari10: true
          }
        },
        sourceMap: config.plugin.prodJsSourceMap,
        cache: true,
        parallel: true
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      //优化css文件的，主要就是压缩css代码
      new OptimizeCSSAssetsPlugin()
    ]
  }
});


//打包情况概览插件调用
if (config.plugin.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = prodWebpackConfig;
