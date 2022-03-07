import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/module/user.js'
import location from '@/store/module/location.js'
import shopCart from '@/store/module/shopCart.js'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    user,
    location,
    shopCart
  }

})
