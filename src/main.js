// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import { Lazyload } from 'vant'
import { InputNumber } from 'element-ui'

import moment from 'moment'

import utils from './components/common'

import '@/style/style.css'
import '@/style/iconfont.js'


Vue.use(Vant).use(Lazyload)
Vue.use(InputNumber)

Vue.config.productionTip = false
Vue.prototype.moment = moment
Vue.prototype.utils = utils
moment.locale('zh-cn')

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");