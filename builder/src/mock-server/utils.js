/**
 * 读取json文件
 * @param filePath
 * @returns {any}
 */
exports.getJsonFile = function (filePath) {
  //读取指定json文件
  // var json = fs.readFileSync(path.resolve(__dirname, './data/' + filePath), 'utf-8');
  const json = fs.readFileSync(path.resolve('./mock/data/' + filePath), 'utf-8');
  //解析并返回
  return JSON.parse(json);
};
