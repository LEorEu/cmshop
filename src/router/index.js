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
// 我的订单
import Order from '@/page/order'
import orderAll from '../page/order/orderAll'
import sendItem from '../page/order/sendItem'
import acceptItem from '../page/order/acceptItem'
import commentItem from '../page/order/commentItem'

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
    // 我的订单
    {
      path: '/order',
      component: Order,
      redirect: '/order/orderAll',
      // 其他订单状态
      children: [{
          path: 'orderAll',
          component: orderAll
        },
        {
          path: 'sendItem',
          component: sendItem
        },
        {
          path: 'acceptItem',
          component: acceptItem
        },
        {
          path: 'commentItem',
          component: commentItem
        },
      ]
    },
  ]
})
