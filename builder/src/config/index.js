const path = require("path");
const merge = require("webpack-merge");

const _base_config = require("./envconfig/base-config");
const _dev_config = require("./envconfig/dev-config");
const _prod_config = require("./envconfig/prod-config");
const _plugin_config = require("./envconfig/plugin-config");
const _tools_config = require("./envconfig/tools-config");

const defaultConfig = merge(_base_config, _dev_config, _prod_config, _plugin_config, _tools_config);

const customConfig = require(path.resolve("env.param.config"));


if (!customConfig) {
  throw "not found custom config file - env.param.config.js";
}

const c = merge(defaultConfig, customConfig);

// console.log("最终配置对象:");
// console.log(c);

module.exports = c;
