/**
 * Webpack prod config for MPA project
 * multi-entrance and multi-exit
 */

"use strict";
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


const utils = require("../../utils");
const config = require("../../config");
const baseWebpackConfig = require("../../basic/webpack.base.conf");
const webpackCreateTemp = require("../../basic/webpack.create.temp");


const entries = utils.getEntries("./src/views/**/main.js"); // 获得入口js文件

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

// const env = require('../../config/' + process.env.env_config + '.env');

const env = require(utils.rootPath("env.config"))[
  process.env.NODE_ENV === "testing" ? "test_env" : "prod_env"
  ];


// For NamedChunksPlugin
const seen = new Set();
const nameLength = 4;

const prodWebpackConfig = merge(baseWebpackConfig, webpackCreateTemp, {
  mode: "production",// 通过 mode 声明生产环境
  module: {},
  entry: entries,
  devtool: config.prod.prodJsSourceMap ? config.prod.devtool : false,
  output: {
    path: config.prod.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash:8].js"),
    chunkFilename: utils.assetsPath("js/[name].[chunkhash:8].js")
  },

  /**
   * 如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，
   * 那就可以通过配置externals。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用。
   */
  externals: config.prod.externals,

  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env
    }),

    //默认情况下，clean-webpack-plugin 将删除webpack的output.path目录中的所有文件，以及每次成功重建后所有未使用的webpack资产
    new cleanWebpackPlugin(),

    // extract css into its own file 在打包的css文件也增加了块和hash尾缀
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[contenthash:8].css"),
      chunkFilename: utils.assetsPath("css/[name].[contenthash:8].css")
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === "testing"
        ? "index.html"
        : config.prod.index,
      template: config.prod.templateSPA,
      inject: true,
      favicon: config.prod.favicon,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },

      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode: "dependency",

      templateParameters: {
        BASE_URL: config.prod.assetsPublicPath + config.prod.assetsSubDirectory
      }
    }),

    new ScriptExtHtmlWebpackPlugin({
      //`runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),

    // keep chunk.id stable when chunk has no name
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      const modules = Array.from(chunk.modulesIterable);
      if (modules.length > 1) {
        const hash = require("hash-sum");
        const joinedHash = hash(modules.map(m => m.id).join("_"));
        let len = nameLength;
        while (seen.has(joinedHash.substr(0, len))) len++;
        seen.add(joinedHash.substr(0, len));
        return `chunk-${joinedHash.substr(0, len)}`;
      } else {
        return modules[0].id;
      }
    }),

    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.rootPath(config.prod.staticPath),//path.resolve(__dirname, '../../static'),
        to: config.prod.assetsSubDirectory,
        ignore: [".*"]
      }
    ])
  ],

  optimization: {
    // 提取公共代码
    splitChunks: config.prod.splitChunks,
    /**
     * 它的作用是将包含chunks 映射关系的 list单独从 app.js里提取出来，因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，
     * 所以你每次改动都会影响它，如果不将它提取出来的话，等于app.js每次都会改变。缓存就失效了
     * 在多页面项目中，盲目设置，会造成所依赖引用的js模块无法正常运行使用
     **/
    runtimeChunk: "single",
    /**
     * webpack4只需要设置 mode:produciton，默认optimization.minimize是true,所以js可以自动帮你打包混淆js代码.
     * 但是自定义minimizer后，webpack默认配置会取消掉,所以还需要添加 uglifyjs压缩js.
     */
    minimizer: [

      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     mangle: {
      //       //支持safari10且修复，2.0.0 版本之后移除
      //       // safari10: true,
      //     }
      //   },
      //   sourceMap: config.prod.prodJsSourceMap,
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
        sourceMap: config.prod.prodJsSourceMap,
        terserOptions: {
          warnings: false,
          compress: {
            drop_console: config.prod.dropConsole, //去除 console.log
            drop_debugger: config.prod.dropDebugger, //去除 debugger
            pure_funcs: config.prod.dropConsole ? ["console.log"] : [] // 移除console
          }
        }
      }),

      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      //优化css文件的，主要就是压缩css代码
      new OptimizeCSSAssetsPlugin()
    ]
  }
});


/**
 * 开启 gzip
 * 打包后你生成的文件就会包含一个xx.xx.gz二进制格式的压缩文件
 * 但是我们打包后引用的是xx.xx.js，并不是这个.gz的压缩文件，需要后端配合修改一下nginx的配置，
 * 增加gzip_static on。所以仅仅有gzip on是不行滴。
 * ================================================
 * Request Header ：
 *      Accept-Encoding: gzip, deflate, br
 * Response Header ：
 *      Content-Encoding: gzip
 * ================================================
 * 注意: compression-webpack-plugin 如果是1.X的版本，则参数asset 存在。如果是2.x的版本，那么参数 asset必须换成 filename
 * 参考：
 * https://github.com/webpack-contrib/compression-webpack-plugin
 * http://www.css88.com/doc/webpack2/plugins/compression-webpack-plugin/
 */
if (config.prod.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");
  prodWebpackConfig.plugins.push(
    new CompressionWebpackPlugin(
      {
        //目标资源名称。 [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
        filename: "[path].gz[query]",
        //可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
        algorithm: "gzip",
        //所有匹配该正则的资源都会被处理。默认值是全部资源。
        test: new RegExp(
          "\\.(" +
          config.prod.productionGzipExtensions.join("|") +
          ")$"
        ),
        //只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
        threshold: 10240,
        //只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
        minRatio: 0.8
      })
  );
}

//打包情况概览插件调用
if (config.prod.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = prodWebpackConfig;
