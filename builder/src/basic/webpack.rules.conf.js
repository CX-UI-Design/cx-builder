const utils = require("../utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");

const isDev = process.env.NODE_ENV === "development";

let JSBabelInclude = [...config.base.JSBabelInclude, ...["node_modules/webpack-dev-server/client"]];
JSBabelInclude = JSBabelInclude.map(src => utils.rootPath(src));

const createLintingRule = () => ({
  test: /\.(js|jsx|ts|tsx|vue)$/,
  loader: "eslint-loader",
  /**因为.vue文件已经被vue-loader处理过了，而eslint-loader只是做代码检测，肯定不能让它去默认处理.vue文件。
   * 我们希望vue-loader在处理.vue文件之前，让eslint-loader先进行一次代码检测。
   * 如果代码检测都通过不了的话，那么vue-loader就不需要处理了，直接报错就OK了。所以需要加上 enforce: 'pre'，这叫预处理。
   **/
  enforce: "pre",
  include: JSBabelInclude,// 指定检查的目录
  // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
  options: {
    formatter: require("eslint-friendly-formatter"),// 指定错误报告的格式规范
    // 是否需要eslint输出警告信息
    emitWarning: isDev ? !config.dev.showEslintErrorsInOverlay : false
  }
});


const rules = [
  ...(utils.getPropertyByEnv("useEslint") ? [createLintingRule()] : []),
  {
    test: /\.vue$/,
    loader: "vue-loader",
    options: vueLoaderConfig
  },
  {
    test: /\.js$/,
    loader: "babel-loader?cacheDirectory",
    include: JSBabelInclude
  },
  {
    test: /\.svg$/,
    loader: "svg-sprite-loader",
    include: [utils.rootPath("artisan/src/icons")],
    options: {
      symbolId: "icon-[name]"
    }
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: "url-loader",
    exclude: [utils.rootPath("artisan/src/icons")],
    options: {
      limit: 10000,
      name: utils.assetsPath("img/[name].[hash:7].[ext]")
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: "url-loader",
    options: {
      limit: 10000,
      name: utils.assetsPath("media/[name].[hash:7].[ext]")
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: "url-loader",
    options: {
      limit: 10000,
      name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
    }
  }
];

const styleRules = utils.styleLoaders(
  isDev ? { sourceMap: config.dev.devCssSourceMap, usePostCSS: config.dev.usePostCSS } :
    {
      sourceMap: utils.getPropertyByEnv("prodCssSourceMap"),
      extract: utils.getPropertyByEnv("extract"),//是否需要分离出js中的css代码,然后分别进行打包
      usePostCSS: utils.getPropertyByEnv("usePostCSS")//补全css代码的兼容性前缀
    }
);

module.exports = [...rules, ...styleRules];
