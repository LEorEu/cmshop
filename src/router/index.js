import Vue from 'vue'
import Router from 'vue-router'

// 登录跳转
import Link from '@/page/home/link'

// 首页
import Home from '@/page/home'

// 分类
import Category from '@/page/home/category'

// 购物车
import Cart from '@/page/cart'

// 商品列表页
import List from '@/page/shop/list'

// 商品详情页
import Details from '@/page/shop/item'

// 支付页
import Pay from '@/page/pay/pay'

// 个人中心
import Ucenter from '@/page/usercenter'

// 优惠券
import Coupon from '@/page/coupon'
import couponList from '@/page/coupon/list'
import couponReceive from '@/page/coupon/receive'


// 我的地址
import Address from '@/page/usercenter/address'

// 我的订单
import Order from '@/page/order'
import orderAll from '../page/order/orderAll'
import sendItem from '../page/order/sendItem'
import acceptItem from '../page/order/acceptItem'
import commentItem from '../page/order/commentItem'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: '/cmshops/',
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/link'
    },
    // 登录跳转
    {
      path: '/link',
      component: Link
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
    // 购物车
    {
      path: '/cart',
      component: Cart
    },
    // 支付页
    {
      path: '/pay',
      component: Pay
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
    // 优惠券
    {
      path: '/coupon',
      component: Coupon,
      redirect: '/coupon/list',
      children: [{
        path: 'list',
        component: couponList
      },
      {
        path: 'receive',
        component: couponReceive
      }]
    },
    // 我的地址
    {
      path: '/ucenter/address',
      component: Address
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
