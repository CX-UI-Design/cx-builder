"use strict";
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


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
  /**
   * 如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，
   * 那就可以通过配置externals。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用。
   */
  externals: config.plugin.externals,

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

      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     mangle: {
      //       // safari10: true
      //     }
      //   },
      //   sourceMap: config.plugin.prodJsSourceMap,
      //   cache: true,
      //   parallel: true
      // }),

      /**
       * 如果代码里面包含了ES6的语法，则uglifyjs不支持，且uglifyjs对去console支持不好，
       * 故而用terser-webpack-plugin替换掉uglifyjs-webpack-plugin
       */
      new TerserPlugin({
        parallel: true, // 开启多进程压缩
        cache: true, // 开启缓存(压缩过的不压缩)
        sourceMap: config.plugin.prodJsSourceMap,
        terserOptions: {
          warnings: false,
          compress: {
            drop_console: config.plugin.dropConsole, //去除 console.log
            drop_debugger: config.plugin.dropDebugger, //去除 debugger
            pure_funcs: config.plugin.dropConsole ? ["console.log"] : [] // 移除console
          }
        }
      }),

      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      //优化css文件的，主要就是压缩css代码
      new OptimizeCSSAssetsPlugin()
    ] : []
  }
});


//打包情况概览插件调用
if (config.plugin.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = prodWebpackConfig;
