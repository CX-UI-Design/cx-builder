const fs = require('fs');
const merge = require('webpack-merge');
const utils = require('../utils');
const config = require('../config/index');
const babelrc = require('./babelrc');

let exportConf = {};

if (fs.existsSync(utils.rootPath('./babel.config.js'))) {
  const rootConf = require(utils.rootPath('babel.config.js'));

  //是否根配置优先
  if (config.base.babel.priority) {
    exportConf = rootConf;
  }
  //不优先情况下，需合并
  //可能会遇到配置项重名的问题 - 报错
  else {
    exportConf = merge(babelrc, rootConf);

    exportConf.plugins = [...new Set(exportConf.plugins)];
    exportConf.presets = [...new Set(exportConf.presets)];
  }
} else {
  exportConf = babelrc;
}

// console.log(' 处理好的babel配置如下：');
// console.log(exportConf);

module.exports = exportConf;
