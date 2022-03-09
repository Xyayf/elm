<template>
  <div class="shop_page" style="padding-top: 1.5rem">
    <header-top goBack="back" />
    <header class="shop_header">
      <section
        class="tab_left"
        :class="{ tab_activity: tabActive === 1 }"
        @click="tabchange(1)"
      >
        <span>商品</span>
      </section>
      <section
        class="tab_right"
        :class="{ tab_activity: tabActive === 2 }"
        @click="tabchange(2)"
      >
        <span>评价</span>
      </section>
    </header>
    <!-- 左边菜单栏 -->
    <section
      class="shop_detail"
      v-if="tabActive === 1"
      id="left_menuClick"
      ref="left_menuClick"
    >
      <section class="shop_flex_left">
        <ul>
          <li
            class="shop_left_detail"
            v-for="(item, index) in FoodMenu"
            :key="item.id"
            :class="{ shop_left_detail_active: shopLeftActive === index }"
            @click="shopLeftActives(index)"
          >
            <span>{{ item.name }}</span>
            <span v-if="showMuneNum(item.foods[0].category_id)">{{
              showMuneNum(item.foods[0].category_id)
            }}</span>
          </li>
        </ul>
      </section>
      <!-- 右边菜单栏 -->
      <section
        class="shop_flex_right"
        id="right_menuScoll"
        ref="right_menuScoll"
      >
        <ul>
          <li
            class="shop_right_detail"
            v-for="(item, index) in FoodMenu"
            :key="index"
          >
            <hgroup class="shop_title">
              <h1 class="shop_title_h">{{ item.name }}</h1>
              <span>{{ item.description }}</span>
            </hgroup>
            <section
              class="shop_content"
              v-for="(Foodfoods, index) in item.foods"
              :key="index"
            >
              <header class="shop_content_mian">
                <section class="content_flext_left">
                  <img src="" alt="" />
                </section>
                <section class="content_flex_right">
                  <h1 class="content_right_header">
                    <h5>{{ Foodfoods.name }}</h5>
                    <span
                      v-for="(item, index) in Foodfoods.attributes"
                      :key="index"
                    >
                      <span
                        v-if="item"
                        class="span_icon"
                        :style="{
                          color: '#' + item.icon_color,
                          borderColor: '#' + item.icon_color,
                        }"
                        >{{ item.icon_name }}</span
                      >
                    </span>
                  </h1>
                  <h1 class="content_right_middle">
                    <span>{{ Foodfoods.tips }}</span>
                  </h1>
                  <h1 class="content_right_footer">
                    <span>¥{{ Foodfoods.specfoods[0].price }}</span>
                    <AddButton
                      :Foodfood="Foodfoods.specfoods"
                      :categroy_id="Foodfoods.category_id"
                      @showSpeci="showSpeci"
                      @recordDot="recordDot"
                    />
                  </h1>
                </section>
              </header>
            </section>
          </li>
        </ul>
      </section>
      <!-- 选规格弹出层 -->
      <section class="shop_popup" v-if="showpopup">
        <div class="shop_popup_contain">
          <h1 class="shop_popup_contain_header">{{ popupFoodName }}</h1>
          <ul class="clear shop_popup_contain_middle">
            <li
              v-for="(item, index) in popupFood"
              :key="item.food_id"
              class="shop_popup_contain_middle_li"
              :class="{
                shop_popup_contain_middle_li_active: index === popupFoodIndex,
              }"
              @click="savepopupFoodIndex(index)"
            >
              {{ item.specs_name }}
            </li>
          </ul>
          <h1 class="shop_popup_contain_footer">
            <div class="cancel_button" @click="showSpeci">取消</div>
            <div
              class="add_cart_button"
              @click="
                addCart(
                  popupFood[popupFoodIndex].restaurant_id,
                  categroy_id,
                  popupFood[popupFoodIndex].item_id,
                  popupFood[popupFoodIndex].food_id,
                  popupFood[popupFoodIndex].name,
                  popupFood[popupFoodIndex].price,
                  popupFood[popupFoodIndex].specs,
                  popupFood[popupFoodIndex].packing_fee,
                  popupFood[popupFoodIndex].sku_id,
                  popupFood[popupFoodIndex].stock
                )
              "
            >
              加入购物车
            </div>
          </h1>
        </div>
      </section>
    </section>
    <!-- 购物车 -->
    <section class="buy_cart_container">
      <section @click="toggleCartList" class="cart_icon_num">
        <div
          class="cart_icon_container"
          :class="{
            cart_icon_activity: totalPrice > 0,
            move_in_cart: receiveInCart,
          }"
          ref="cartContainer"
        >
          <span v-if="totalNum" class="cart_list_length">
            {{ totalNum }}
          </span>
          <svg class="cart_icon">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#cart-icon"
            ></use>
          </svg>
        </div>
        <div class="cart_num">
          <div>¥ {{ totalPrice }}</div>
          <div>配送费¥{{ deliveryFee }}</div>
        </div>
      </section>
      <section
        class="gotopay"
        :class="{ gotopay_acitvity: minimumOrderAmount <= 0 }"
      >
        <span class="gotopay_button_style" v-if="minimumOrderAmount > 0"
          >还差¥{{ minimumOrderAmount }}起送</span
        >
        <router-link
          :to="{ path: '/confirmOrder', query: { geohash, shopId } }"
          class="gotopay_button_style"
          v-else
          >去结算</router-link
        >
      </section>
    </section>
    <!-- 小圆点 -->

    <transition
      appear
      @after-appear="afterEnter"
      @before-appear="beforeEnter"
      v-for="(item, index) in showMoveDot"
      :key="index"
    >
      <span class="move_dot" v-if="item">
        <svg class="move_liner">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#cart-add"
          ></use>
        </svg>
      </span>
    </transition>
  </div>
</template>
<script>

import AddButton from '@/components/AddButton.vue'
import { getFoodMenu } from '@/api/getData.js'
import { mapState } from 'vuex'
import headerTop from '@/components/heder.vue'
import BScroll from 'better-scroll'
export default {
  components: {
    AddButton,
    headerTop
  },
  data () {
    return {
      restaurant_id: null,
      tabActive: 1,
      shopLeftActive: null,
      FoodMenu: null, // 获取的食品列表
      popupFood: null, // 弹出层
      showpopup: false, // 选规格的弹出层
      popupFoodIndex: 0,
      categroy_id: null, // 从组件返回的
      totalPrice: null,
      categomenu: [],
      cartFoodList: null,
      count: 0,
      showMoveDot: []// 小圆点
    }
  },
  created () {
    // 初始化数据
    this.initData()
    // 获取视频列表
    this.getFoodMenus()
    this.initCartList()
  },
  mounted () {
    this.windowHeight = window.innerHeight
  },
  computed: {
    ...mapState({
      cartList: (state) => state.shopCart.cartList
    }),

    popupFoodName () {
      return this.popupFood[this.popupFoodIndex].name
    },
    // //当前商店购物信息
    shopCart: function () {
      return { ...this.cartList[this.restaurant_id] }
    }

  },
  watch: {
    shopCart () {
      this.initCartList()
    }
  },
  methods: {
    // 初始化路由数据
    initData () {
      this.restaurant_id = this.$route.query.id
    },

    // 拆分购物车提出数据
    initCartList () {
      const categomenu = []
      let totalPrice = 0
      const cartFoodList = []
      if (this.shopCart) {
        Object.keys(this.shopCart).forEach((categoid) => {
          let categcount = 0
          if (this.shopCart[categoid]) {
            Object.keys(this.shopCart[categoid]).forEach((itemid) => {
              if (this.shopCart[categoid][itemid]) {
                Object.keys(this.shopCart[categoid][itemid]).forEach((foodid) => {
                  const foodItem = this.shopCart[categoid][itemid][foodid]
                  if (foodItem.num) {
                    const num = foodItem.num
                    const price = foodItem.price
                    totalPrice += num * price
                    categcount += num
                    cartFoodList.push({
                      categoryid: categoid,
                      itemid: itemid,
                      foodid: foodid,
                      name: foodItem.name,
                      price: foodItem.price,
                      specs: foodItem.specs,
                      packingfee: foodItem.packingfee,
                      skuid: foodItem.skuid,
                      stock: foodItem.stock,
                      num: foodItem.num
                    })
                  }
                })
              }
            })
          }

          categomenu.push({
            categoid,
            categcount
          })
        })
      }

      this.totalPrice = totalPrice.toFixed(2)
      this.categomenu = [...categomenu]
      this.cartFoodList = cartFoodList
    },
    // 获取食品列表
    async getFoodMenus () {
      try {
        const { data } = await getFoodMenu(this.restaurant_id)
        this.FoodMenu = data
        this.$nextTick(() => {
          this.intiRight()
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 规格弹出和隐藏 弹出时赋值，隐藏时清空
    showSpeci (food) {
      this.showpopup = !this.showpopup
      this.popupFoodIndex = 0
      this.categroy_id = null
      this.popupFood = null
      if (food) {
        this.popupFood = food.food
        this.categroy_id = food.categroy_id
      }
    },
    savepopupFoodIndex (index) {
      this.popupFoodIndex = index
    },
    // 加入购物车
    addCart (shopid,
      categoryid,
      itemid,
      foodid,
      name,
      price,
      specs,
      packingfee,
      skuid,
      stock) {
      this.$store.commit({
        type: 'shopCart/AddCart',
        shopid: this.popupFood[this.popupFoodIndex].restaurant_id,
        categoryid: this.categroy_id,
        itemid: this.popupFood[this.popupFoodIndex].item_id,
        foodid: this.popupFood[this.popupFoodIndex].food_id,
        name: this.popupFood[this.popupFoodIndex].name,
        price: this.popupFood[this.popupFoodIndex].price,
        specs: this.popupFood[this.popupFoodIndex].specs,
        packingfee: this.popupFood[this.popupFoodIndex].packing_fee,
        skuid: this.popupFood[this.popupFoodIndex].sku_id,
        stock: this.popupFood[this.popupFoodIndex].stock
      })
      // 加入购物车后隐藏规格弹出层
      this.showSpeci()
    },
    // 不加入购物车
    cancelCart () {

    },
    // 头部tab 栏切换
    tabchange (type) {
      if (this.tabActive !== type) {
        this.tabActive = type
      }
    },

    // 右边栏计数小圆点
    showMuneNum (categoryid) {
      const result = this.categomenu.find((item) => {
        return parseInt(item.categoid) === categoryid
      })
      if (result) {
        return result.categcount
      } else {
        return 0
      }
    },
    // 初始化右边的滚动菜单
    intiRight () {
      if (this.$refs.right_menuScoll.children[0].children) {
        const rightmenuScollHeight = Array.from(this.$refs.right_menuScoll.children[0].children).map((item) => {
          return item.offsetTop
        })
        console.log(rightmenuScollHeight)
        const el = this.$refs.right_menuScoll
        this.rightMenuScrll = new BScroll(el, {
          probeType: 3,
          deceleration: 0.001,
          bounce: false,
          swipeTime: 2000,
          click: true
        })
        const leftMenuScrll = new BScroll('#left_menuClick')

        this.rightMenuScrll.on('scroll', pos => {
          let leftindex = rightmenuScollHeight.findIndex((item) => {
            const a = Math.abs(Math.round(pos.y))
            return item >= a
          })
          if (leftindex !== 0) { leftindex -= 1 }
          // console.log(leftindex)
          leftMenuScrll.scrollToElement(Array.from(this.$refs.left_menuClick.children[0].children[0].children)[leftindex])
          this.shopLeftActive = leftindex
        })
      } else {
        console.log('kongkonng')
      }
    },
    // 左边点击控制右边滚动
    // 左侧切换卡选中
    shopLeftActives (index) {
      this.shopLeftActive = index
      const el = Array.from(this.$refs.right_menuScoll.children[0].children)[index]
      this.rightMenuScrll.scrollToElement(el)
    },
    // 记录小圆点的相对于视口的位置

    // 显示下落圆球
    recordDot ({ showMoveDot, elLeft, elBottom }) {
      console.log(showMoveDot, elLeft, elBottom)
      this.showMoveDot = [...this.showMoveDot, ...showMoveDot]
      this.elLeft = elLeft
      this.elBottom = elBottom
    },
    beforeEnter (el) {
      console.log(el.children[0])
      el.style.transform = `translate3d(0,${30 + this.elBottom - this.windowHeight
        }px, 0)`
      el.children[0].style.transform = `translate3d(${this.elLeft - 30
        }px, 0, 0)`
      el.children[0].style.opacity = 0
    },
    afterEnter (el) {
      console.log('after')
      el.style.transform = 'translate3d(0,0,0)'
      el.children[0].style.transform = 'translate3d(0,0,0)'
      el.style.transition =
        'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)'
      el.children[0].style.transition = 'transform .55s linear'
      this.showMoveDot = this.showMoveDot.map((item) => false)
      el.children[0].style.opacity = 1
      el.children[0].addEventListener('transitionend', () => {
        // this.listenInCart()
      })
      el.children[0].addEventListener('webkitAnimationEnd', () => {
        // this.listenInCart()
      })
    },
    // 监听圆点是否进入购物车
    // listenInCart () {
    //   if (!this.receiveInCart) {
    //     this.receiveInCart = true
    //     this.$refs.cartContainer.addEventListener('animationend', () => {
    //       this.receiveInCart = false
    //     })
    //     this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
    //       this.receiveInCart = false
    //     })
    //   }
    // }
    toggleCartList () {

    },
    // 还差多少元起送，为负数时显示去结算按钮
    minimumOrderAmount () { }

  }
}

</script>
<style lang="less" scoped>
@import "../../style/mixins.less";

//头部
.shop_header {
  display: flex;
  font-size: 0.65rem;
  color: #3190e8;
  justify-content: space-around;
  text-align: center;
  background-color: #fff;
  height: 2rem;
  line-height: 2rem;
  .tab_left {
    flex: 1;

    span {
      border-right: 1px solid #3190e8;
    }
  }
  .tab_right {
    flex: 1;
  }
}
//商品详情
.shop_detail {
  .shop_flex_left {
    position: fixed;
    top: 4rem;
    bottom: 0;
    z-index: 666;
    min-height: 0;
    overflow: auto;
    float: left;
    width: 22%;
    background-color: #f5f5f5;
    .shop_left_detail {
      font-size: 0.65rem;
      .wh(4.2rem,2.4rem);
      padding: 0.5rem;
      border-bottom: 0.025rem solid #ededed;
      text-align: start;
      line-height: 1.4rem;
      border-left: 0.15rem solid #f8f8f8;
      color: #666;
    }
  }
  .shop_flex_right {
    float: right;
    width: 73%;
    background-color: #fff;
    max-height: 667px;
    overflow: auto;
    .shop_right_detail {
      .shop_title {
        display: flex;
        color: #666;
        font-size: 0.7rem;
        padding: 0.5rem;
        background-color: #f5f5f5;
        h1 {
          color: #666;
          font-weight: 700;
        }
        span {
          font-size: 0.5rem;
          color: #999;
          text-align: center;
          padding: 0.2rem 0 0 0.2rem;
        }
      }
      .shop_content {
        .shop_content_mian {
          display: flex;
          padding: 0.5rem;

          .content_flext_left {
            img {
              .wh(2rem,2rem);
            }
          }
          .content_flex_right {
            margin-left: 0.2rem;
            width: 100%;
            font-size: 0.5rem;
            .content_right_header {
              display: flex;
              h5 {
                font-size: 0.7rem;
                font-weight: 800;
              }
              span {
                transform: scale(0.8);
                font-size: 0.5rem;
                border: 1px solid #fff;
                padding: 0 0.2rem;
                border-radius: 0.2rem;
              }
            }
            .content_right_middle {
            }
            .content_right_footer {
              font-size: 0.7rem;
              span {
                color: #f60;
              }
              font-weight: 800;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
}
//选规格的弹出层
.shop_popup {
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.4);
  .shop_popup_contain {
    width: 70%;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .shop_popup_contain_header {
      text-align: center;
      font-size: 1rem;
    }
    .shop_popup_contain_middle {
      padding: 0.3rem;

      .shop_popup_contain_middle_li {
        float: left;
        font-size: 0.65rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        width: 3rem;
        margin-right: 8px;
        border-radius: 0.5rem;
      }
    }
    .shop_popup_contain_footer {
      display: flex;
      .add_cart_button {
        font-size: 0.65rem;
        line-height: 2rem;
        background-color: @blue;
        width: 30%;
        margin: 8px;
        border-radius: 0.5rem;
        color: #fff;
      }
      .cancel_button {
        font-size: 0.65rem;
        line-height: 2rem;
        width: 30%;
        margin: 8px;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
        text-align: center;
      }
    }
  }
}
//tab选中后样式
.tab_activity {
  background-color: #3190e8;
  color: #fff;
}
.shop_left_detail_active {
  background-color: #fff;
  border-left: 0.15rem solid #3190e8 !important;
  font-weight: 800 !important;
}
//规格选中后样式
.shop_popup_contain_middle_li_active {
  border: @blue 1px solid !important ;
  color: @blue !important;
}
//小圆点
.move_dot {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 9999;

  svg {
    .wh(0.9rem, 0.9rem);
    fill: #3190e8;
  }
}
// 购物车
.buy_cart_container {
  position: absolute;
  background-color: #3d3d3f;
  bottom: 0;
  left: 0;
  z-index: 13;
  display: flex;
  .wh(100%, 2rem);
  .cart_icon_num {
    flex: 1;
    .cart_icon_container {
      display: flex;
      background-color: #3d3d3f;
      position: absolute;
      padding: 0.4rem;
      border: 0.18rem solid #444;
      border-radius: 50%;
      left: 0.5rem;
      top: -0.7rem;
      .cart_icon {
        .wh(1.2rem, 1.2rem);
      }
      .cart_list_length {
        position: absolute;
        top: -0.25rem;
        right: -0.25rem;
        background-color: #ff461d;
        line-height: 0.7rem;
        text-align: center;
        border-radius: 50%;
        border: 0.025rem solid #ff461d;
        min-width: 0.7rem;
        height: 0.7rem;
        font-family: Helvetica Neue, Tahoma, Arial;
      }
    }
    .move_in_cart {
      animation: mymove 0.5s ease-in-out;
    }
    .cart_icon_activity {
      background-color: #3190e8;
    }
    .cart_num {
      left: 3.5rem;

      div {
        color: #fff;
      }
      div:nth-of-type(1) {
        font-size: 0.8rem;
        font-weight: bold;
        margin-bottom: 0.1rem;
      }
      div:nth-of-type(2) {
        font-size: 0.4rem;
      }
    }
  }
  .gotopay {
    position: absolute;
    right: 0;
    background-color: #535356;
    .wh(5rem, 100%);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .gotopay_button_style {
      font-weight: bold;
    }
  }
  .gotopay_acitvity {
    background-color: #4cd964;
  }
}
</style>
