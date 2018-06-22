// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import { Lazyload } from 'vant'

import moment from 'moment'

import '@/style/style.css'
import '@/style/iconfont.js'


Vue.use(Vant).use(Lazyload)
Vue.config.productionTip = false
Vue.prototype.moment = moment
moment.locale('zh-cn')

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");