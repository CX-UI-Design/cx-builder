/**
 * utils - 为整个脚手架提供方法
 */
'use strict';
const fs = require('fs');//引入文件系统模块
const path = require('path');//path模块提供了用于处理文件和目录路径的使用工具
const chalk = require('chalk');
const config = require(path.resolve('env.param.config'));
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageConfig = require('../../package.json');

/**
 * root path
 * @param _path
 * @returns {void | * | {extensions, alias} | Promise<void> | Promise<any>}
 */
exports.rootPath = function (_path) {
  return path.resolve(_path);
};


/**
 * assetsPath
 * 它根据 nodejs 的 proccess.env.NODE_ENV 变量，来判断当前运行的环境。
 * 返回不同环境下面的不同static目录位置拼接给定的_path参数。
 * @param _path  接受一个_path参数
 * @returns {*|string} 返回static目录位置拼接的路径
 */
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path)
};

/**
 * cssLoaders
 * @param options   接受一个options参数，参数还有的属性：sourceMap、usePostCSS。
 * @returns {{css: *, postcss: *, less: *, sass: *, scss: *, stylus: *, styl: *}}
 */
exports.cssLoaders = function (options) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  //是否需要补全css代码的兼容性前缀配置，需要的话把 postcssLoader 注入
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  /**
   * 生成加载器 - generate loader string to be used with extract text plugin
   * @param loader                loader 的名称
   * @param loaderOptions         loader 的配置项
   * @returns {*}
   */
  function generateLoaders(loader, loaderOptions) {
    const loaders = [];

    /*----------------------------------------------------------------------------------------*/
    /*  Extract CSS when that option is specified (which is the case during production build) */
    /*  是否需要分离出js中的css代码,然后分别进行打包                                               */
    /*  此项目中，development 时不分离， production 时 分离                                      */
    /*----------------------------------------------------------------------------------------*/
    if (options.extract) {
      loaders.push(MiniCssExtractPlugin.loader)
    } else {
      loaders.push('vue-style-loader')
    }

    loaders.push(cssLoader);

    if (options.usePostCSS) {
      loaders.push(postcssLoader)
    }

    //注入loader的相关配置
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    //sass-resources-loader 在webpack4中暂时无更新，故而无法使用
    const sassResources = config.base.sassResources;
    if (sassResources.length !== 0 && loader === 'sass') {
      loaders.push({
        loader: 'sass-resources-loader',
        options: {
          resources: sassResources
        }
      })
    }
    return loaders
  }

  /**
   * judge use modifyVars or not
   * @param type
   * @returns {*}
   */
  function useModifyVars(type) {
    try {
      const themeConfig = config.base.themeConfig;
      if (themeConfig.type === type) {
        return themeConfig.switch ? {modifyVars: themeConfig.theme} : {}
      }
      else {
        return {}
      }
    }
    catch (e) {
      return {}
    }
  }

  /**
   * 同时，它返回一个对象，其中包含了css预编译器(less、sass、stylus)loader生成方法等,
   * 如果你的文档明确只需要一门css语言，那么可以稍微清楚一些语言，同时可以减少npm包的大小(毕竟这是一个令人烦躁的东西)
   */
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less', useModifyVars('less')),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
};

/**
 * styleLoaders
 * Generate loaders for standalone style files (outside of .vue)
 * 该方法只是根据cssLoaders中的方法配置，生成不同loaders。然后将其返回。
 * @param options
 * @returns {Array}
 */
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
};

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
};


/**
 * 读取json文件
 * @param filePath
 * @returns {any}
 */
exports.getJsonFile = function (filePath) {
  //读取指定json文件
  // var json = fs.readFileSync(path.resolve(__dirname, './data/' + filePath), 'utf-8');
  var json = fs.readFileSync(path.resolve('./mock/data/' + filePath), 'utf-8');
  //解析并返回
  return JSON.parse(json);
};

/**
 * get alias path config list
 */
exports.getAliasPathConfig = function () {
  let aliasPath = {
    'vue$': 'vue/dist/vue.esm.js',
    '@': path.resolve('src') //resolve('packages')
  };
  try {
    config.base.aliasPath.forEach(info => {
      if (!aliasPath.hasOwnProperty(info.name)) {
        aliasPath[info.name] = path.resolve(info.path)
      }
    });
    return aliasPath;
  }
  catch (e) {
    console.log('\n');
    console.log(chalk.red('Warning: there are some errors in alias config , so use default config replace it.\n'));
    return aliasPath;
  }
};
