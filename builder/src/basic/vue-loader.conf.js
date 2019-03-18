'use strict';
const utils = require('../utils');
const isProduction = process.env.NODE_ENV === 'production';

const sourceMapEnabled = isProduction
  ? utils.getPropertyByEnv('prodJsSourceMap')
  : utils.getPropertyByEnv('cssSourceMap');

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: utils.getPropertyByEnv('cacheBusting'),
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};
