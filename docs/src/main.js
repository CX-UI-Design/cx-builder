// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Vant from 'vant'
import 'vant/lib/index.less';

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.scss'
import fetch from './fetch/index'

Vue.prototype.$fetch = fetch;
Vue.config.productionTip = false;

Vue.use(Vant);


import './assets/css/test.less'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
