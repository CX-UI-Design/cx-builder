const path = require("path");
module.exports = {
  base: {
    mockPath: "./mock",//mock文件所在路径

    babel: {
      priority: false,//是否根配置优先
      //babel compiler path / eslint path
      include: [
        "env.config.js",
        "env.param.config.js",
        "config",
        "mock",
        "node_modules/neap-core/injection",
        "node_modules/neap-core/lib"
      ]
    },

    //指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
    extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".json", ".scss", "less"],

    //配置别名可以加快webpack查找模块的速度
    alias: {
      /**
       * vue有两种形式的代码 compiler（模板）模式和runtime模式（运行时），vue模块的package.json的main字段默认为runtime模式， 指向了"dist/vue.runtime.common.js"位置。
       * 报错：You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
       * import Vue from ‘vue’ 这行代码被解析为 import Vue from ‘vue/dist/vue.esm.js’，直接指定了文件的位置，没有使用main字段默认的文件位置
       */
      "vue$": "vue/dist/vue.esm.js",
      "@": path.resolve("src"),
      '@ROOT': path.resolve(''),
      '@NEAP': path.resolve('main/src'),
    },

    //Webpack loader for creating SVG sprites.
    svgSprite: {
      include: [path.resolve("config/expand/iconfont")],
      extract: true,
      outputPath: "static/svgIcons/",
      publicPath: "static/svgIcons/",
      spriteFilename: "svg-sprite.svg"
    },


    //use modify vars - 样式主题混入调试
    mixinPalette: {
      switch: false,
      type: "less",
      theme: null
    },

    //sass-resources-loader 在webpack4中暂时无更新，故而无法使用
    sassResources: [],

    themeConfig: {
      switch: false,
      type: "less"
      // theme: require(path.resolve('core/basic/style/theme/normal')),
    },

    //prettier code - 美化
    prettier: {
      switch: false,
      files: [
        "src/**/*.{vue,less,scss,css,js,jsx,ts,tsx,json}",
        "test/**/*.{js,ts,json}",
        "mock/**/*.{js,ts,json}"
      ]
    }
  }
};
