import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Msite from '@/views/msite/msite.vue'
// 引入store
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 首页
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }, {
    path: '/profile', // 个人页面
    name: 'Profile',
    component: () => import('../views/profile/profile.vue')
  },
  {
    path: '/msite', // 商铺列表页
    name: 'Msite',
    component: Msite
  },
  {
    path: '/food', // 食品分类页
    name: 'Food',
    component: () => import('../views/food/food.vue')
  },
  {
    path: '/shop', // 商铺详情页
    name: 'Shop',
    component: () => import('../views/shop/shop.vue')
  },
  {
    path: '/confirmOrder', // 订单确认页面
    component: () => import('../views/confirmOder/confirmOrder.vue'),
    children: [
      {
        path: 'remark', // 订单备注
        component: () => import('.../views/confirmOder/children/remark.vue')
      },
      {
        path: 'invoice', // 发票抬头
        component: () => import('../views/confirmOder/children/invoice.vue')
      },
      {
        path: 'payment', // 付款页面
        component: () => import('../views/confirmOder/children/payment.vue')
      },
      {
        path: 'userValidation', // 用户验证
        component: () => import('../views/confirmOder/children/userValidation.vue')
      },
      {
        path: 'chooseAddress', // 选择地址
        component: () => import('../views/confirmOder/children/chooseAddress.vue'),
        children: [{
          path: 'addAddress', // 添加地址
          component: () => import('../views/confirmOder/children/children/addAddress.vue'),
          children: [{
            path: 'searchAddress', // 搜索地址
            component: () => import('../views/confirmOder/children/children/children/searchAddress.vue')
          }]
        }]
      }
    ]
  },
  {
    path: '/forget', // 修改密码页
    component: () => import('../views/forget/forget')
  },
  {
    path: 'order', // 订单列表页
    component: () => import('../views/order/order.vue'),
    children: [
      {
        path: 'orderDetail', // 订单详情页
        component: () => import('../views/order/children/orderDetail.vue')
      }
    ]
  },
  {
    path: '/vipcard', // vip页
    component: () => import('../views/vipcard/vipcard.vue'),
    children: [{
      path: 'invoiceRecord', // 开发票
      component: () => import('../views/vipcard/children/invoiceRecord.vue')
    }, {
      path: 'useCart', // 购买会员卡
      component: () => import('../views/vipcard/children/useCart.vue')
    }, {
      path: 'vipDescription', // 会员说明
      component: () => import('../views/vipcard/children/vipDescription.vue')
    }]
  },
  // 发现页
  {
    path: '/find',
    component: () => import('../views/find/find.vue')
  },
  // 下载页
  {
    path: '/download',
    component: () => import('../views/download/download.vue')
  },
  // 服务中心
  {
    path: '/service',
    component: () => import('../views/service/service.vue'),
    children: [{
      path: 'questionDetail', // 订单详情页
      component: () => import('../views/service/children/questionDetail.vue')
    }]
  },
  // 余额
  {
    path: 'balance',
    component: () => import('@/views/balance/balance.vue'),
    children: [{
      path: 'detail', // 余额说明
      component: () => import('@/views/balance/children/detail.vue')
    }]
  },
  // 我的优惠页
  {
    path: 'benefit',
    component: () => import('@/views/benefit/benefit.vue'),
    children: [{
      path: 'coupon', // 代金券说明
      component: () => import('@/views/benefit/children/coupon.vue')
    }, {
      path: 'hbDescription', // 红包说明
      component: () => import('@/views/benefit/children/hbDescription.vue')
    }, {
      path: 'hbHistory', // 历史红包
      component: () => import('@/views/benefit/children/hbHistory.vue')
    }, {
      path: 'exchange', // 兑换红包
      component: () => import('@/views/benefit/children/exchange.vue')
    }, {
      path: 'commend', // 推荐有奖
      component: () => import('@/views/benefit/children/commend.vue')
    }]
  },
  // 我的积分页
  {
    path: 'points',
    component: () => import('@/views/points/points.vue'),
    children: [{
      path: 'detail', // 积分说明
      component: () => import('@/views/points/children/detail.vue')
    }]
  }

]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.meta.keepAlive) {
        to.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

// const whitelist = []
// router.beforeEach(ayncs(to, from, next) => {
//   if (store.state.user.token) {
//         if (to.path === '/login') {
//              next('/')
//         } else {
//                 if(!store.getters.hasUserInfon){
//                   await store.dispatch('user/getUserInfo')}
//                       next()
//                     }
//                   } else {
//                     if (whitelist.indexOf(to.path) > -1) {
//                       next()
//      } else {
//       next('/login')
//     }
//   }
// })

export default router
