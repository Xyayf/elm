import { loginApi } from '../../api/getData'
import { setItem, getItem } from '@/config/storage.js'
export default {
  namespaced: true,
  state: {
    // 用户信息
    userInfo: getItem('token') || null
  },
  mutations: {
    setUserInfo (store, userInfo) {
      store.userInfo = userInfo
      console.log(store.userInfo)
    }
  },
  actions: {
    login (context, userLogin) {
      const { username, password, captchaCode } = userLogin
      return new Promise((resolve, reject) => {
        loginApi(username, password, captchaCode).then((res) => {
        //   console.log(res)
          if (res.data.user_id) {
            context.commit('setUserInfo', res.data)
            setItem('token', res.data)
          }
          resolve(res)
        }).catch(err => console.log(err))
      })
    }
  }

}
