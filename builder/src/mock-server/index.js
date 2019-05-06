const path = require('path');
const bodyParser = require('body-parser');
const config = require('../config');

/**
 * 注入 mock 路径下所有配置文件
 * https://www.npmjs.com/package/require-all
 */
const controllers = require('require-all')({
  dirname: path.resolve(config.base.mockPath),
});

//将注入的对象取value转换为数组
const mockModule = Object.values(controllers) || [];

// console.log(mockModule);

module.exports = function (app) {

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  mockModule.forEach(module => {
    Object.keys(module).forEach(key => {
      const _method = key.split(' ')[0].toLowerCase();//mock 请求方法
      const _url = key.split(' ')[1];//mock 请求地址
      const _callback = module[key];//mock 回调函数

      // console.log(_method, _url);

      app[_method](_url, _callback);
    });
  })
};
