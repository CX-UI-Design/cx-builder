"use strict";
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


const utils = require("../utils");
const config = require("../config");
const baseWebpackConfig = require("../basic/webpack.base.conf");


// const env = require('../../config/' + process.env.env_config + '.env');

const env = require(utils.rootPath("env.config"))[
  process.env.NODE_ENV === "testing" ? "test_env" : "prod_env"
  ];


const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  module: {},
  entry: config.plugin.entry,
  devtool: config.plugin.prodJsSourceMap ? config.plugin.devtool : false,
  output: {
    path: config.plugin.assetsRoot,
    publicPath: config.plugin.assetsPublicPath,
    library: config.plugin.outputLibrary,
    libraryTarget: config.plugin.libraryTarget,
    filename: config.plugin.filename
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env
    }),

    //默认情况下，clean-webpack-plugin 将删除webpack的output.path目录中的所有文件，以及每次成功重建后所有未使用的webpack资产
    new cleanWebpackPlugin(),

    // extract css into its own file 在打包的css文件也增加了块和hash尾缀
    new MiniCssExtractPlugin({
      filename: `${config.plugin.outputLibrary}.min.css`
    }),


    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.rootPath(config.plugin.staticPath),//path.resolve(__dirname, '../../static'),
        to: config.plugin.assetsSubDirectory,
        ignore: [".*"]
      }
    ])
  ],
  optimization: {
    /**
     * webpack4只需要设置 mode:produciton，默认optimization.minimize是true,所以js可以自动帮你打包混淆js代码.
     * 但是自定义minimizer后，webpack默认配置会取消掉,所以还需要添加 uglifyjs压缩js.
     */
    minimizer: config.plugin.isMinify ? [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            // safari10: true
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
    ] : false
  }
});


//打包情况概览插件调用
if (config.plugin.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = prodWebpackConfig;
