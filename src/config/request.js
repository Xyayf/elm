import axios from 'axios'
const servies = axios.create({
  baseURL: '',
  timeout: 5000
})
servies.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  // config.headers.Authorization=`Bearer${store.store.getters.token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
servies.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // return response.data
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default servies
