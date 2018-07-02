import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Home from '@/page/home'
// 分类
import Category from '@/page/home/category'

// 商品详情页
import List from '@/page/shop/list'
// 商品详情页
import Details from '@/page/shop/item'


// 个人中心
import Ucenter from '@/page/usercenter'

Vue.use(Router)

export default new Router({
  // mode: 'hash',
  // base: '/cmshops/',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // 首页
    {
      path: '/home',
      component: Home
    },
    // 分类页
    {
      path: '/category',
      component: Category
    },
    // 商品列表页
    {
      path: '/shop/list',
      component: List
    },
    // 商品详情页
    {
      path: '/shop/item',
      component: Details
    },
    // 个人中心
    {
      path: '/ucenter',
      component: Ucenter
    },
  ]
})
