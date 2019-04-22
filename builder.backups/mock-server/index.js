const path = require('path');
const Mock = require('mockjs');
const utils = require('../utils');
const bodyParser = require('body-parser');
const config = require(path.resolve('env.param.config'));

const mockEntry = config.base.mockEntry || './mock/index';

const apiConfig = require(utils.rootPath(mockEntry));


module.exports = function (app) {
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  apiConfig.api.forEach(_conf => {
    app[_conf.method](_conf.path, _conf.callback ? _conf.callback : function (rep, res) {
      var json = utils.getJsonFile(_conf.dataFile);
      res.json(Mock.mock(json));
    })
  });
};
