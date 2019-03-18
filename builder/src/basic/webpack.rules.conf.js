const utils = require('../utils');
const config = require(utils.rootPath('env.param.config'));
const vueLoaderConfig = require('./vue-loader.conf');

const isDev = process.env.NODE_ENV === "development";


const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [utils.rootPath('src'), utils.rootPath('test')],// 指定检查的目录
  // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
  options: {
    formatter: require('eslint-friendly-formatter'),// 指定错误报告的格式规范
    // 是否需要eslint输出警告信息
    emitWarning: isDev ? !config.dev.showEslintErrorsInOverlay : false
  }
});

const rules = [
  ...(utils.getPropertyByEnv('useEslint') ? [createLintingRule()] : []),
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderConfig
  },
  {
    test: /\.js$/,
    loader: 'babel-loader?cacheDirectory',
    include: [utils.rootPath('src'), utils.rootPath('test'), utils.rootPath('node_modules/webpack-dev-server/client')]
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('media/[name].[hash:7].[ext]')
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
    }
  }
];

const styleRules = utils.styleLoaders(
  isDev ? {sourceMap: config.dev.devCssSourceMap, usePostCSS: config.dev.usePostCSS} :
    {
      sourceMap: utils.getPropertyByEnv('prodCssSourceMap'),
      extract: utils.getPropertyByEnv('extract'),//是否需要分离出js中的css代码,然后分别进行打包
      usePostCSS: utils.getPropertyByEnv('usePostCSS'),//补全css代码的兼容性前缀
    }
);

module.exports = [...rules, ...styleRules];