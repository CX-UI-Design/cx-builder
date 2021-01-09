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

/**
 * change default config base on custom config state
 * @param defaultConfig
 * @param customConfig
 * @returns {*}
 */
function filterChangeConfig(defaultConfig, customConfig) {
  try {

    /**
     * 提取公共代码的配置项，一旦自定义配置后，将全部覆盖原有默认配置，而不是根据字段合并
     */
    if (customConfig.prod.splitChunks) {
      defaultConfig.prod.splitChunks = {};
    }
    return defaultConfig;
  }
  catch (e) {
    return defaultConfig;
  }
}


const c = merge(filterChangeConfig(defaultConfig, customConfig), customConfig);


// console.log("最终配置对象:");
// console.log(c);


module.exports = c;
