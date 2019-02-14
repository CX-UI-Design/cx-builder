'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require('../utils');
const config = require(utils.rootPath('env.param.config'));
const baseWebpackConfig = require('../basic/webpack.base.conf');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const _is_mock = process.env.env_config === 'mock';
const env = require(utils.rootPath('env.config'))[_is_mock ? 'mock_env' : 'dev_env'];

const devWebpackConfig = {
  mode: 'development', // 通过 mode 声明开发环境
  module: {},
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/env.param.config.js
  devServer: {
    /**
     * 当使用内联模式(inline mode)时，会在开发工具(DevTools)的控制台(console)显示消息, 可能的值有 none, error, warning 或者 info（默认值）
     */
    clientLogLevel: 'warning',
    /**
     * 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
     * 通过传入一个对象，比如使用 rewrites 这个选项，此行为可进一步地控制：
     */
    historyApiFallback: {
      rewrites: [
        {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
      ],
    },
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    hot: config.dev.hot,//启用 webpack 的模块热替换特性
    host: HOST || config.dev.host,//默认是 localhost
    port: PORT || config.dev.port,//指定要监听请求的端口号
    open: config.dev.autoOpenBrowser,//是否自动打开浏览器
    //当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    /**
     * 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
     * 可在之后的 portfinder 中定义输出的内容
     **/
    quiet: config.dev.quiet,
    stats: "errors-only", //stats: "errors-only"表示只打印错误：
    // before: require('../mock-server/index'),//引入mock/index.js
    before: _is_mock ? require('../mock-server/index') : (app) => {
    },
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    /**
     * 定义process.env
     */
    new webpack.DefinePlugin({
      'process.env': env
    }),
    /**
     * 模块热替换插件
     */
    new webpack.HotModuleReplacementPlugin(),
    /**
     * 显示模块加载相对路径插件
     * HMR shows correct file names in console on update.
     */
    new webpack.NamedModulesPlugin(),
    /**
     * 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
     */
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {

        from: utils.rootPath('./static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
};

module.exports = merge(baseWebpackConfig, devWebpackConfig);


