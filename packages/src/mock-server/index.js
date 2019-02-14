const Mock = require('mockjs');
const utils = require('../utils');
const bodyParser = require('body-parser');
const apiConfig = require(utils.rootPath('./mock/index'));

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
