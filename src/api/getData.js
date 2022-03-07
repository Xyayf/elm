import request from '@/config/request.js'

// 获取定位城市
export const guessCity = () => {
  return request({
    url: 'https://elm.cangdu.org/v1/cities?type=guess',
    method: 'get'

  })
}
// 获取热门城市
export const hotCity = () => {
  return request({
    url: 'v1/cities?type=hot',
    method: 'get'

  })
}
// 获取所有城市
export const groupCity = () => {
  return request({
    url: 'v1/cities',
    method: 'get',
    params: {
      type: 'group'
    }

  })
}

// 登录
export const loginApi = (username, password, captchaCode) => {
  return request({
    url: 'v2/login',
    method: 'post',
    data: {
      username,
      password,
      captcha_code: captchaCode
    }
  })
}
// 获取验证码
export const getcaptchas = () => {
  return request(
    {
      url: 'v1/captchas',
      method: 'post'
    }
  )
}
// 获取食品分类列表
export const getIndexEntry = () => {
  return request({
    url: 'v2/index_entry',
    method: 'get'
  })
}
// food页面 获取所有商铺分类列表
export const getRescategory = (location) => {
  return request({
    url: 'shopping/v2/restaurant/category',
    method: 'get',
    params: {
      latitude: location.latitude,
      longitude: location.longitude

    }
  })
}
// food页面 获取配送方式
export const getDeliveryMode = (location) => {
  return request({
    url: 'shopping/v1/restaurants/delivery_modes',
    method: 'get',
    params: {
      latitude: location.latitude,
      longitude: location.longitude

    }
  })
}
// food页面 获取商家属性活动列变
export const getRestaActivity = (location) => {
  return request({
    url: 'shopping/v1/restaurants/activity_attributes',
    method: 'get',
    params: {
      latitude: location.latitude,
      longitude: location.longitude

    }
  })
}
// shoplist组件 获取商铺列表
export const getShopList = ({
  latitude, longitude, offset = 0, limit = 20, restaurant_category_id, order_by,
  restaurant_category_ids, delivery_mode, support_ids = []
}) => {
  let supportsring
  support_ids.forEach((item) => {
    if (item.statue) {
      supportsring += '&support_ids[]' + item.id
    }
  })

  return request({
    url: 'shopping/restaurants',
    method: 'get',
    params: {
      latitude,
      longitude,
      offset,
      limit,
      restaurant_category_id,
      order_by,
      'restaurant_category_ids[]': restaurant_category_ids,
      'delivery_mode[]': delivery_mode + supportsring
    }

  })
}
//shop页面 获取食品列表
export const getFoodMenu=(restaurant_id)=>{
return request({
  url:'shopping/v2/menu',
  method:'get',
  params:{
    restaurant_id
  }
})
}
