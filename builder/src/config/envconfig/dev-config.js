const path = require("path");
module.exports = {
  dev: {
    mode: "SPA",//项目模式 SPA / MPA
    entry: "./src/main.js",
    // Paths
    assetsPublicPath: "/", // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsSubDirectory: "static", // 编译输出的二级目录
    contentBase: path.resolve("./dist"), //"./dist/"
    cssExtractPublicPath: "./",//MiniCssExtractPlugin 路径

    templateSPA: "./index.html",//模板文件抽取所在路径
    staticPath: "./static",//静态文件static抽取所在路径

    favicon: path.resolve("./favicon.ico"), //favicon

    proxyTable: {},
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8080, //端口号
    inline: true,
    autoOpenBrowser: true, //是否自动打开浏览器
    errorOverlay: true, //当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
    hot: true, //热启动
    quiet: true, //启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    usePostCSS: true, //补全css代码的兼容性前缀
    /** Source Maps */
    devCssSourceMap: false, // 是否开启 cssSourceMap
    devJsSourceMap: false, // 是否开启 jsSourceMap
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    filterEntries:[],//在MPA 模式下，过滤掉的模块页面

    prescript: [],//run custom script before main script
    posscript: []//run custom script after main script
  }
};
