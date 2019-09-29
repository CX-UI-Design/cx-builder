const path = require("path");

module.exports = {
  prod: {
    mode: "SPA",//项目模式 SPA / MPA
    entry: "./src/main.js",
    // Template for index.html
    index: path.resolve("./dist/index.html"),
    // Paths
    assetsPublicPath: "/", // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsRoot: path.resolve("./dist"), // 编译输出的静态资源路径
    assetsSubDirectory: "static", // 编译输出的二级目录
    cssExtractPublicPath: "./",//MiniCssExtractPlugin 路径

    favicon: path.resolve("./favicon.ico"), //favicon

    templateSPA: "./index.html",//模板文件抽取所在路径
    staticPath: "./static",//静态文件抽取static所在路径

    /**
     * 如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，
     * 那就可以通过配置externals。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用。
     */
    externals: {},

    // 提取公共代码
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        },
        elementUI: {
          name: "chunk-elementUI", // 单独将 elementUI 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        },
        commons: {
          name: "chunk-commons",
          test: path.resolve("src/components"), // 可自定义拓展你的规则
          minChunks: 3, // 最小公用次数
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },

    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true, // 是否开启 gzip
    productionGzipExtensions: ["js", "css"], // 需要使用 gzip 压缩的文件扩展名

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

    extract: true, //是否需要分离出js中的css代码,然后分别进行打包
    usePostCSS: true, //补全css代码的兼容性前缀
    useEslint: true,
    /** Source Maps */
    prodCssSourceMap: false, // 是否开启 cssSourceMap
    prodJsSourceMap: false, // 是否开启 jsSourceMap
    cacheBusting: true,

    filterEntries:[],//在MPA 模式下，过滤掉的模块页面

    prescript: [],//run custom script before main script
    posscript: []//run custom script after main script
  }
};
