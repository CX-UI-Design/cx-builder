const path = require("path");
const fs = require("fs-extra");
const bodyParser = require("body-parser");
const chokidar = require("chokidar");
const chalk = require("chalk");
const config = require("../config");

const mockDir = config.base.mockPath;

let mockModules = [];
let mockRoutesLength = null;
let mockStartIndex = null;

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

        const moduleObj = require(path.resolve(filedir));
        const moduleKeyArr = Object.keys(moduleObj);

        moduleKeyArr.forEach(key => {
          mockModules.push({ [key]: moduleObj[key] });
        });
      }
    }
    if (isDir) {
      getMockModules(filedir);
    }
  });
};

/**
 * register mock API
 * @param app
 * @param mockModules - mock modules list
 */
function registerMockAPi(app, mockModules) {

  //get mock modules
  getMockModules(mockDir);

  //register
  mockModules.forEach(module => {
    let mockLastIndex;
    Object.keys(module).forEach(key => {
      const _method = key.split(" ")[0].toLowerCase();//mock 请求方法
      const _url = key.split(" ")[1];//mock 请求地址
      const _callback = module[key];//mock 回调函数

      // console.log(_method, _url);

      app[_method](_url, _callback);  //core code

      mockLastIndex = app._router.stack.length;
    });

    mockRoutesLength = Object.keys(mockModules).length;
    mockStartIndex = mockLastIndex - mockRoutesLength;
  });
}

/**
 * unregister mock API
 */
function unregisterMockAPi() {
  mockModules = [];
  Object.keys(require.cache).forEach(i => {
    if (i.includes(path.join(process.cwd(), mockDir))) {
      delete require.cache[require.resolve(i)];
    }
  });
}


module.exports = function(app) {
  // es6 polyfill
  require("@babel/register");

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  registerMockAPi(app, mockModules);//register mock api

  // watch files, hot reload mock server
  chokidar.watch(
    path.join(process.cwd(), mockDir),
    {
      ignoreInitial: true
    }
  ).on(
    "all",
    (event, path) => {
      if (["change", "add", "unlink"].includes(event)) {
        try {
          console.log(`\n `);
          console.log(chalk.magentaBright(`\n > Mock Server watching ...`));

          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          unregisterMockAPi(); //unregister

          registerMockAPi(app, mockModules);//register mock api

          console.log(chalk.magentaBright(`\n > ${event}： ${path}`));
          console.log(chalk.magentaBright(`\n > Mock Server hot reload success!`));

        } catch (error) {
          console.log(chalk.redBright(error));
        }
      }
    });
};


/**
 * 注入 mock 路径下所有配置文件
 * https://www.npmjs.com/package/require-all
 */
// const controllers = require("require-all")({
//   dirname: path.resolve(mockDir)
// });
//
// //将注入的对象取value转换为数组
// const mockModule = Object.values(controllers) || [];



