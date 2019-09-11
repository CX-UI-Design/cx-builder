const path = require('path');
module.exports = {
  base: {
    mockPath: './mock',//mock文件所在路径

    //指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json', '.scss', 'less'],

    //配置别名可以加快webpack查找模块的速度
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src')
    },

    //babel compiler path / eslint path
    JSBabelInclude: ['src', 'mock', 'test'],

    //use modify vars - 样式主题混入调试
    mixinPalette: {
      switch: false,
      type: 'less',
      theme: null
    },

    //sass-resources-loader 在webpack4中暂时无更新，故而无法使用
    sassResources: [],

    themeConfig: {
      switch: false,
      type: 'less',
      // theme: require(path.resolve('core/basic/style/theme/normal')),
    },

    //prettier code - 美化
    prettier: {
      switch: false,
      files: [
        'src/**/*.{vue,less,scss,css,js,jsx,ts,tsx,json}',
        'test/**/*.{js,ts,json}',
        'mock/**/*.{js,ts,json}',
      ],
    },
  },
};
