'use strict';
const path = require('path');

module.exports = {
  dev: {
    mode: 'MPA', //项目模式 SPA / MPA
    port: 8066,
    useEslint: false,
  },
  prod: {
    mode: 'MPA', //项目模式 SPA / MPA
    assetsPublicPath: '../',
    // // 提取公共代码
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 5,
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: module => {
            if (module.resource) {
              const include = [/[\\/]node_modules[\\/]/].every(reg => {
                return reg.test(module.resource);
              });
              const exclude = [/[\\/]node_modules[\\/](vue|element-ui|neap-ui|)/].some(reg => {
                return reg.test(module.resource);
              });
              return include && !exclude;
            }
            return false;
          },
          priority: -10,
          chunks: 'initial', // 只打包初始时依赖的第三方
        },

        vue: {
          name: 'chunk-vue',
          priority: 20,
          test: /[\\/]node_modules[\\/]vue[\\/]/,
        },

        'element-ui': {
          name: 'chunk-element-ui',
          priority: 20,
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
        },

        'neap-ui': {
          name: 'chunk-neap-ui',
          priority: 20,
          test: /[\\/]node_modules[\\/]neap-ui[\\/]/,
        },

        'biz-components': {
          name: 'chunk-biz-components',
          test: /[\\/]node_modules[\\/]neap-test1[\\/]injection[\\/]repositories[\\/]NS_biz_components[\\/]/,
          priority: 20,
        },

        // 'neap-test1': {
        //   name: 'chunk-neap-core',
        //   priority: 20,
        //   test: /[\\/]node_modules[\\/]neap-test1[\\/]/,
        // },

        // commons: {
        //   name: 'chunk-commons',
        //   test: /[\\/]node_modules[\\/]neap-test1[\\/]injection[\\/]repositories[\\/]NS_biz_components[\\/]/,
        //   minChunks: 2, // 最小公用次数
        //   priority: 30,
        //   reuseExistingChunk: true,
        // },

        // commons: {
        //   name: 'chunk-commons',
        //   test: resolve('src/components'), // 可自定义拓展你的规则
        //   minChunks: 3, // 最小公用次数
        //   priority: 5,
        //   reuseExistingChunk: true,
        // },
      },
    },
    useEslint: false,
  },
  base: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve('src'),
      '@core': path.resolve('core'),
    },
    prettier: {
      switch: true,
      files: [
        'mock/**/*.js',
        '.postcssrc.js',
        'env.config.js',
        'env.param.config.js',
        '.eslintrc.js',
      ],
    },
  },
};
