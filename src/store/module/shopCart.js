export default {
  namespaced: true,
  state: {
    cartList: {}, // 加入购物车的商品列表,
    remarktext: null, // 备注选择内容
    inputremark: null, // 备注输入的内容,
    addressRes: null// 收获地址

  },
  mutations: {
    // 加入购物车
    AddCart (state,
      {
        shopid,
        categoryid,
        itemid,
        foodid,
        name,
        price,
        specs,
        packingfee,
        skuid,
        stock
      }) {
      const cartList = state.cartList
      const shopids = cartList[shopid] = (cartList[shopid] || {})
      const categoryids = shopids[categoryid] = (shopids[categoryid] || {})
      const itemids = categoryids[itemid] = (categoryids[itemid] || {})
      if (itemids[foodid]) {
        itemids[foodid].num++
      } else {
        itemids[foodid] = {
          num: 1,
          id: foodid,
          name: name,
          price: price,
          specs: specs,
          packing_fee: packingfee,
          sku_id: skuid,
          stock: stock
        }
      }
      state.cartList = { ...cartList }
      console.log(state.cartList)
    },
    // 移除购物车
    RemoveCart (state,
      {
        shopid,
        categoryid,
        itemid,
        foodid

      }) {
      const cartList = state.cartList
      const shopids = cartList[shopid] = (cartList[shopid] || {})
      const categoryids = shopids[categoryid] = (shopids[categoryid] || {})
      const itemids = categoryids[itemid] = (categoryids[itemid] || {})
      if (itemids[foodid] && itemids[foodid].num > 0) {
        itemids[foodid].num--
      } else {
        itemids[foodid] = null
      }
      state.cartList = { ...cartList }
      console.log(state.cartList)
    },
    // 清空购物车
    cleaeCart (state, shopid) {
      state.cartList[shopid] = null
      state.cartList = { ...state.cartList }
    },
    // 记录备注内容
    recordRemark (state, remark) {
      state.remarktext = remark.remarktext
      state.inputremark = remark.remarktext
    },
    // 选择收获地址
    chooseAddress (state, { address }) {
      state.addressRes = address
    }
  }
}
