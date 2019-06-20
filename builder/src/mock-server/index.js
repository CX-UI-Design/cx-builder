const path = require("path");
const fs = require("fs-extra");
const bodyParser = require("body-parser");
const config = require("../config");


const mockModules = [];

/**
 * get mock modules in mock dir
 * @param filePath
 */
const getMockModules = filePath => {

  const files = fs.readdirSync(filePath);

  files.forEach(filename => {
    const filedir = path.join(filePath, filename);
    const statInfo = fs.statSync(filedir);//return fs.Stats object by file path
    const isFile = statInfo.isFile();//is file
    const isDir = statInfo.isDirectory();//is dir

    if (isFile) {

      const reg = /\.([0-9a-z]+)(?:[\?#]|$)/i; //文件扩展名的正则表达式
      const ext = filedir.match(reg)[1];//获得文件扩展名

      if (["js", "ts", "jsx", "tsx"].includes(ext)) {
        mockModules.push(require(path.resolve(filedir)));
      }
    }
    if (isDir) {
      getMockModules(filedir);
    }
  });
};


module.exports = function(app) {
  getMockModules(config.base.mockPath);


  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());


  mockModules.forEach(module => {
    Object.keys(module).forEach(key => {
      const _method = key.split(" ")[0].toLowerCase();//mock 请求方法
      const _url = key.split(" ")[1];//mock 请求地址
      const _callback = module[key];//mock 回调函数

      // console.log(_method, _url);

      app[_method](_url, _callback);
    });
  });

};



/**
 * 注入 mock 路径下所有配置文件
 * https://www.npmjs.com/package/require-all
 */
// const controllers = require("require-all")({
//   dirname: path.resolve(config.base.mockPath)
// });
//
// //将注入的对象取value转换为数组
// const mockModule = Object.values(controllers) || [];



