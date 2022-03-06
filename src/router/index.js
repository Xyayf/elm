import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Msite from '@/views/msite/msite.vue'
// 引入store
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ '../views/profile/profile.vue')
  },
  {
    path: '/msite',
    name: 'Msite',
    component: Msite
  },
  {
    path: '/food',
    name: 'Food',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "food" */ '../views/food/food.vue')
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
//     if (to.path === '/login') {
//       next('/')
//     } else {
// if(store.getters.hasUserInfon){
//   await store.dispatch('user/getUserInfo')}
//       next()
//     }
//   } else {
//     if (whitelist.indexOf(to.path) > -1) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })

export default router
