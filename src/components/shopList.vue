<template>
  <div class="shopList">
    <ul v-load-more="loadMores" v-if="shopList.length">
      <router-link
        v-for="(item, index) in shopList"
        :key="index"
        :to="{ path: '/shop', query: { geohash, id: item.id } }"
        tag="li"
        class="item_contain_li"
      >
        <section class="flex_left">
          <img
            src="/Users/mac/Desktop/屏幕快照 2022-02-21 22.10.55.png"
            alt=""
          />
        </section>
        <hgroup class="flex_right">
          <header>
            <h4 :class="item.is_premium ? 'premium' : ''">{{ item.name }}</h4>
            <ul>
              <li
                class="supports_icon"
                v-for="item in item.supports"
                :key="item.id"
              >
                {{ item.icon_name }}
              </li>
            </ul>
          </header>
          <h5 class="right_middle">
            <section class="right_middle_left">
              <rating :rating="item.rating" />
              <span>月售{{ item.recent_order_num }}</span>
            </section>
            <section class="right_middle_right">
              <span
                class="delivery_mode delivery_mode_left"
                v-if="item.delivery_mode"
              >
                {{ item.delivery_mode.text }}
              </span>
              <span
                class="delivery_mode delivery_mode_right"
                v-if="isOnTime(item.supports)"
              >
                准时宝
              </span>
            </section>
          </h5>
          <h5 class="right_bottom">
            <section class="right_bottom_left">
              <span>¥{{ item.float_minimum_order_amount }}起送</span>
              <span> / {{ item.piecewise_agent_fee.tips }}</span>
            </section>
            <section class="right_bottom_right"></section>
          </h5>
        </hgroup>
      </router-link>
    </ul>
    <ul v-else class="animation_opactiy">
      <li class="list_back_li" v-for="item in 10" :key="item">
        <img src="../images/shopback.svg" class="list_back_svg" />
      </li>
    </ul>
    <span v-if="noMore">没有更多了.....</span>
    <loading v-if="showLoading" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import loading from '@/components/loading.vue'
import { loadMore } from '@/Minxin/v-load.js'
import { getShopList } from '@/api/getData.js'
import rating from '@/components/rating.vue'

export default {
  props: [
    'order_by',
    'delivery_mode',
    'support_ids',
    'restaurant_category_id',
    'restaurant_category_ids',
    'comfrim'
  ],
  mixins: [loadMore],
  components: {
    loading,
    rating
  },
  created () {
    this.initData()
    console.log()
  },
  computed: {
    ...mapState({
      latitude: (state) => state.location.latitude,
      longitude: (state) => state.location.longitude,
      geohash () {
        return this.latitude.toString() + this.longitude
      }
    })
  },
  watch: {
    comfrim () {
      this.getShopLists()
    },
    order_by () {
      this.getShopLists()
    },
    restaurant_category_ids () {
      this.getShopLists()
    }
  },
  data () {
    return {
      shopList: null,
      showLoading: false,
      offset: 0, // 偏移量
      noMore: false, // 标记还有没有更多数据
      flag: false // 用于获取更多数据时节流
    }
  },
  methods: {
    async initData () {
      this.shopList = await this.getShopLists()
    },
    // 获取商品列表
    async getShopLists (offset = 0) {
      this.showLoading = true
      try {
        const { data } = await getShopList({
          latitude: this.latitude,
          longitude: this.longitude,
          order_by: this.order_by,
          delivery_mode: this.delivery_mode,
          support_ids: this.support_ids,
          restaurant_category_id: this.restaurant_category_id,
          restaurant_category_ids: this.restaurant_category_ids,
          offset: offset
        })
        this.showLoading = false
        // 考虑到本地模拟数据是引用类型，所以返回一个新的数组
        console.log(data)
        return data
        // console.log(data)
      } catch (err) {
        // 这里拦截了错误，不会再向上传递 也可以向上抛错误或者不拦截随其自身份向上抛
        this.showLoading = false
        alert('网络错误')
      }
    },

    async getmore () {},
    // 加载更多
    async loadMores () {
      if (this.noMore) return
      if (!this.flag) {
        this.flag = true
        this.offset += 20
        const res = await this.getShopLists(this.offset)
        this.shopList = [...this.shopList, ...res]
        console.log(this.shopList, res)
        // 当获取数据小于20，说明没有更多数据了
        if (res.length < 20) {
          this.noMore = true
          //   alert('没有更多数据了')
        }
        this.flag = false
      }
      console.log('loading)')
    },
    // 处理是否准时到达
    isOnTime (supports) {
      let isOnTime = false
      if (supports instanceof Array && supports.length) {
        supports.forEach((item) => {
          if (item.icon_name === '准') {
            isOnTime = true
          }
        })
      }
      return isOnTime
    }
  }
}
</script>
<style lang="less" scoped>
@import "../style/mixins.less";
.item_contain_li {
  display: flex;
  justify-content: space-between;
  align-self: center;
  background-color: #fff;
  padding: 0.7rem 0.4rem;
  border-bottom: 0.025rem solid #f1f1f1;
  .flex_left {
    margin-right: 0.2rem;
    img {
      .wh(3.125rem,3.125rem);
    }
  }
  .flex_right {
    width: 100%;
    font: 0.65rem PingFangSC-Regular;
    header {
      display: flex;
      justify-content: space-between;
      h4 {
        font-weight: 800;
      }
    }
    .premium::before {
      display: inline-block;
      content: "品牌";
      font-size: 0.5rem;
      font-weight: 800;
      background-color: #ffd930;
      text-align: center;
      margin-right: 0.2rem;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      .supports_icon {
        font-size: 0.45rem;
        color: #999;
        border: 0.025rem solid #f1f1f1;
        padding: 0 0.05rem;
        border-radius: 0.1rem;
        margin-right: 0.1rem;
      }
    }

    .right_middle {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
      color: #666;
      .right_middle_left {
        display: flex;
        span {
          font-size: 0.4rem;
          transform: scale(0.8);
          margin-top: -0.1rem;
          color: #666;
        }
      }
      .right_middle_right {
        display: flex;
        transform: scale(0.8);
        .delivery_mode_left {
          background-color: #3190e8;
          color: #fff;
          border: #3190e8 1px solid;
          border-radius: 1px;
          margin-right: 0.1rem;
        }
        .delivery_mode_right {
          background-color: #fff;
          border: #3190e8 1px solid;
          color: #3190e8;
          border-radius: 1px;
        }
      }
    }
  }
}
</style>
