import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Home from '@/page/home'
// 个人中心
import Ucenter from '@/page/usercenter'

Vue.use(Router)

export default new Router({
  // mode: 'hash',
  // base: '/cmshops/',
  mode: 'history',
  routes: [
    // 首页
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },// 个人中心
    {
      path: '/ucenter',
      component: Ucenter
    },
  ]
})
