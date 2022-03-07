<template>
  <div class="shop_page">
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
    <section class="shop_detail" v-if="tabActive === 1">
      <section class="shop_flex_left">
        <ul>
          <li
            class="shop_left_detail"
            v-for="(item, index) in FoodMenu"
            :key="index"
            :class="{ shop_left_detail_active: shopLeftActive === index }"
            @click="shopLeftActives(index)"
          >
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </section>
      <section class="shop_flex_right">
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
                  <img :src="Foodfoods.image_path" alt="商品" />
                </section>
                <section class="content_right">
                  <h1 class="content_right_header">
                    <h5>{{ Foodfoods.name }}</h5>
                    <span
                      v-for="(item, index) in Foodfoods.attributes"
                      :key="index"
                    >
                      <span v-if="item" class="span_icon" :style ="{color:'#'+item.icon_color}">{{ item.icon_name }}</span>
                    </span>
                  </h1>
                </section>
              </header>
            </section>
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>
<script>
//  <div v-for="(FoodMenu, index) in FoodMenu" :key="index">
//       <div v-for="(Foodfoods, index) in FoodMenu.foods" :key="index">
//         <AddButton
//           :Foodfood="Foodfoods.specfoods"
//           :categroy_id="Foodfoods.category_id"
//           @showSpeci="showSpeci"
//           @recordDot="recordDot"
//         />
//       </div>
//     </div>
// import AddButton from '@/components/AddButton.vue'
import { getFoodMenu } from '@/api/getData.js'
import { mapState } from 'vuex'
export default {
  components: {
    // AddButton
  },
  data () {
    return {
      restaurant_id: null,
      tabActive: 1,
      shopLeftActive: null,
      FoodMenu: null // 获取的食品列表
    }
  },
  created () {
    // 初始化数据
    this.initData()
    // 获取视频列表
    this.getFoodMenus()
  },
  computed: {
    ...mapState({
      cartList: (state) => state.shopCart.cartList
    })
  },
  methods: {
    // 初始化数据
    initData () {
      this.restaurant_id = this.$route.query.id
    },
    // 获取食品列表
    async getFoodMenus () {
      try {
        const { data } = await getFoodMenu(this.restaurant_id)
        this.FoodMenu = data
        console.log(data, this.FoodMenu)
      } catch (err) {
        console.log(err)
      }
    },
    // 选规格
    showSpeci (food) {
      console.log(food)
    },
    // 记录小圆点的相对于视口的位置
    recordDot (local) {
      console.log(local)
    },
    // 头部tab 栏切换
    tabchange (type) {
      if (this.tabActive !== type) {
        this.tabActive = type
      }
    },
    // 左侧切换卡选中
    shopLeftActives (index) {
      this.shopLeftActive = index
    }
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
  display: flex;

  .shop_flex_left {
    flex: 25%;
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
    flex: 75%;
    background-color: #fff;
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
      .shop_content{}
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
</style>
