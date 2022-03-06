<template>
  <div class="food_page">
    <header-top goBack="goback" :headTitle="headTitle"></header-top>
    <section class="filtrate_top">
      <div class="flex_contain">
        <!-- 商品分类 -->
        <div
          class="flex_item"
          @click="chooseType('food')"
          :class="{ choose_type: type === 'food' }"
        >
          <div class="text_contain">
            <span>{{ foodTitle }}</span>
            <svg
              width="10"
              height="10"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              class="sort_icon"
            >
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <!-- 商品分类筛选 transition -->
        <transition name="sliod_in">
          <section class="sore_detail_contain clear" v-if="type === 'food'">
            <section class="category_left">
              <ul>
                <li
                  class="category—left-li"
                  v-for="(item, index) in category"
                  :key="item.id"
                  @click="saveCategoryId(item.id, index)"
                  :class="{ li_active: item.id === category_id }"
                >
                  <div class="li-left">
                    <img
                      src="https://fuss10.elemecdn.com/4/35/a7eda7659bac613e524ca7c1ae12epng.png"
                      v-if="index > 0"
                    />
                    <span>{{ item.name }}</span>
                  </div>
                  <div class="li-right">
                    <div class="number">{{ item.count }}</div>
                    <svg
                      data-v-6cc1fce6=""
                      width="8"
                      height="8"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      class="category_arrow"
                    >
                      <path
                        data-v-6cc1fce6=""
                        d="M0 0 L6 4 L0 8"
                        stroke="#bbb"
                        stroke-width="1"
                        fill="none"
                      ></path>
                    </svg>
                  </div>
                </li>
              </ul>
            </section>
            <section class="category_right">
              <ul>
                <li
                  class="category—left-li"
                  v-for="item in subcategory"
                  :key="item.id"
                  :class="{ subcategroy_active: item.id === subcategory_id }"
                  @click="saveSubCategoryId(item.id, item.name)"
                >
                  <div class="all">
                    <span>{{ item.name }}</span>
                    <span>{{ item.count }}</span>
                  </div>
                </li>
              </ul>
            </section>
          </section>
        </transition>
        <!-- 排序 -->
        <div
          class="flex_item"
          @click="chooseType('sort')"
          :class="{ choose_type: type === 'sort' }"
        >
          <div class="text_contain">
            <span>排序</span>
            <svg
              width="10"
              height="10"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              class="sort_icon"
            >
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <!-- 排序transition -->
        <transition name="sliod_in">
          <section class="sore_detail_contain" v-if="type === 'sort'">
            <ul @click="sortByType($event)">
              <li class="sort_li" data-type="4">
                <div>
                  <svg class="li_sort_svg">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#default"
                    ></use>
                  </svg>
                </div>
                <p class="li_sort_text">
                  <span>智能排序</span>
                  <svg class="li_sort_svg" v-show="sortType === 4">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                </p>
              </li>
              <li class="sort_li" data-type="5">
                <div>
                  <svg class="li_sort_svg">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#distance"
                    ></use>
                  </svg>
                </div>
                <p class="li_sort_text">
                  <span>距离最近</span>
                  <svg class="li_sort_svg" v-show="sortType === 5">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                </p>
              </li>
              <li class="sort_li" data-type="6">
                <div>
                  <svg class="li_sort_svg">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#hot"
                    ></use>
                  </svg>
                </div>
                <p class="li_sort_text">
                  <span>销量最高</span>
                  <svg class="li_sort_svg" v-show="sortType === 6">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                </p>
              </li>
              <li class="sort_li" data-type="1">
                <div>
                  <svg class="li_sort_svg">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#price"
                    ></use>
                  </svg>
                </div>
                <p class="li_sort_text">
                  <span>起送价最低</span>
                  <svg class="li_sort_svg" v-show="sortType === 1">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                </p>
              </li>
              <li class="sort_li" data-type="2">
                <div>
                  <svg class="li_sort_svg">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#speed"
                    ></use>
                  </svg>
                </div>
                <p class="li_sort_text">
                  <span>配送速度最快</span>
                  <svg class="li_sort_svg" v-show="sortType === 2">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                </p>
              </li>
              <li class="sort_li" data-type="3">
                <div>
                  <svg class="li_sort_svg">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#rating"
                    ></use>
                  </svg>
                </div>
                <p class="li_sort_text">
                  <span>评分最高</span>
                  <svg class="li_sort_svg" v-show="sortType === 3">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                </p>
              </li>
            </ul>
          </section>
        </transition>
        <!-- 配送方式 -->
        <div
          class="flex_item"
          @click="chooseType('activity')"
          :class="{ choose_type: type === 'activity' }"
        >
          <div class="text_contain">
            <span>筛选</span>
            <svg
              width="10"
              height="10"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              class="sort_icon"
            >
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <!-- 配送方式 transition -->
        <transition name="sliod_in">
          <section class="delivery_way_contain" v-if="type === 'activity'">
            <section class="delivery_way filtrate">
              <span>配送方式</span>
              <div class="flex disflex">
                <div
                  class="text_svgchangge"
                  v-for="item in deliveryMode"
                  :key="item.id"
                  @click="sortBydelivery(item.id)"
                  :class="{ border_blue: deliveryModeId === item.id }"
                >
                  <svg class="svg-icon" v-if="deliveryModeId !== item.id">
                    <use
                      data-v-6cc1fce6=""
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#fengniao"
                    ></use>
                  </svg>
                  <svg data-v-6cc1fce6="" class="svg-icon" v-else>
                    <use
                      data-v-6cc1fce6=""
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                  <span>{{ item.text }}</span>
                </div>
              </div>
            </section>
            <section class="active_list filtrate">
              <span>商家活动(可以多选）</span>
              <div class="flex">
                <div
                  class="text_svgchangge"
                  v-for="(item, index) in restaActivity"
                  :key="item.id"
                  @click="sortByactivity(index, item.id)"
                  :class="{ border_blue: supportId[index].statue }"
                >
                  <span
                    class="span_icon"
                    :style="{
                      color: '#' + item.icon_color,
                      borderColor: '#' + item.icon_color,
                    }"
                    v-if="!supportId[index].statue"
                    >{{ item.icon_name }}</span
                  >
                  <svg class="svg-icon" v-else>
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </section>
            <section class="button_contain">
              <div class="clear_all" @click="clearAll">清空</div>
              <div class="confrim" @click="comfrims">确定({{ filterNum }})</div>
            </section>
          </section>
        </transition>
      </div>
    </section>
    <section class="shop_contain">
      <!-- 商品列表 -->
      <shop-list
        :order_by="sortType"
        :delivery_mode="deliveryModeId"
        :support_ids="supportId"
        :restaurant_category_id="category_id"
        :restaurant_category_ids="subcategory_id"
        :comfrim="comfrim"
      ></shop-list>
    </section>
  </div>
</template>
<script>
import headerTop from '@/components/heder.vue'
import shopList from '@/components/shopList.vue'
import { mapState } from 'vuex'
import {
  getRescategory,
  getRestaActivity,
  getDeliveryMode
} from '@/api/getData.js'

export default {
  components: {
    headerTop,
    shopList
  },
  data () {
    return {
      headTitle: '', // 标题名称
      type: '', // 下来菜单（food，sort，activti，‘’）
      foodTitle: '', // categroy名称
      category: null, // 商家列表
      subcategory: null, // 商家的childen
      imgUrl: 'http://elm.cangdu.org/img/',
      category_id: -1, // 商家id
      subcategory_id: null, // 商家childen的id
      deliveryMode: [], // 配送方式
      deliveryModeId: null, // 配送方式id
      restaActivity: [], // 商家活动
      supportId: [], // 选中的商家活动
      filterNum: 0, // x
      sortType: 4, // 排序方式
      comfrim: false // 确定/改变时就向后台发送信息
    }
  },
  created () {
    // 初始化query的数据
    this.intiData()
    // 获取商铺分类列表
    this.getrescategorys()
    // 获取配送方式
    this.getDeliveryModes()
    // 获取商家属性活动列表，初始化suppotId
    this.getRestaActivitys()
  },
  methods: {
    intiData () {
      this.headTitle = this.$route.query.title
      this.foodTitle = this.$route.query.title
      this.category_id = parseInt(this.$route.query.restaurant_category_id)
      this.geohash = this.dealLocation()
    },
    chooseType (type) {
      if (type === this.type) {
        if (type === 'food') {
          this.foodTitle = this.headTitle
        }
        this.type = ''
      } else {
        if (type === 'food') {
          this.foodTitle = '分类'
        } else {
          this.foodTitle = this.headTitle
        }
        this.type = type
      }
    },
    // 路由上的经纬度
    dealLocation () {
      const Arr = this.$route.query.geohash.split(',')
      return {
        latitude: Arr[0],
        longitude: Arr[1]
      }
    },
    // 获取所有商铺分类列表
    async getrescategorys () {
      try {
        const { data } = await getRescategory(this.geohash)
        this.category = data
        data.forEach((item) => {
          if (item.id === this.category_id) {
            this.subcategory = item.sub_categories
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 获取配送方式
    async getDeliveryModes () {
      try {
        const { data } = await getDeliveryMode(this.geohash)
        this.deliveryMode = data
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    // 获取商家属性活动列表，
    async getRestaActivitys () {
      try {
        const { data } = await getRestaActivity(this.geohash)
        this.restaActivity = data
        // console.log(data)
        this.initSupportId(data)
        return data
      } catch (err) {
        throw new Error(err)
      }
    },
    // 初始化supportId
    initSupportId (data) {
      this.supportId = data.map((item) => {
        return {
          statue: false,
          id: item.id
        }
      })
      // console.log(this.supportId)
    },

    // 改变category_id 与 subcategroy
    saveCategoryId (id, index) {
      this.category_id = id
      this.subcategory = this.category[index].sub_categories
      // console.log(id, this.category_id)
    },
    // 改变subcategroy_id与隐藏下来菜单改会fooTitle
    saveSubCategoryId (id, name) {
      // console.log(id)
      this.subcategory_id = id
      this.foodTitle = this.headTitle = name
      this.$nextTick(() => {
        this.type = ''
      })
    },
    // 改变sortType,   隐藏下来菜单
    sortByType (e) {
      let node
      if (e.target.parentNode.nodeName.toUpperCase() === 'LI') {
        node = e.target.parentNode
      } else {
        node = e.target.parentNode.parentNode
      }
      this.sortType = parseInt(node.getAttribute('data-type'))
      // console.log(this.sortType)
      this.$nextTick(() => {
        this.type = ''
      })
    },
    // 改变 deliveryModeid/改变fliternumber
    sortBydelivery (id) {
      if (this.deliveryModeId === null) {
        this.filterNum++
        this.deliveryModeId = id
      } else if (this.deliveryModeId === id) {
        this.filterNum--
        this.deliveryModeId = null
      } else {
        this.deliveryModeId = id
      }
    },
    // 改变supprId/改变fliternumber
    sortByactivity (index, id) {
      // 替换原位置数组
      this.supportId.splice(index, 1, {
        statue: !this.supportId[index].statue,
        id
      })
      if (this.deliveryModeId) {
        this.filterNum =
          this.supportId.filter((item) => item.statue).length + 1
      } else {
        this.filterNum = this.supportId.filter((item) => item.statue).length
      }
      // console.log(this.filterNum, this.supportId)
    },
    // supportId.statue全置为false deliveryModeId置为null，filter number置为0
    clearAll () {
      this.supportId.forEach((item) => {
        item.statue = false
      })
      this.deliveryModeId = null
      this.filterNum = 0
    },
    // 改变确认状态，隐藏下拉菜单
    comfrims () {
      this.comfrim = !this.comfrim
      this.type = ''
    }
  },

  computed: {
    ...mapState({
      latitude: (state) => state.location.latitude,
      longitude: (state) => state.location.longitude
    })
  }
}
</script>
<style lang="less" scoped>
@import "../../style/mixins.less";
.food_page {
  padding-top: 1.5rem;
}
.filtrate_top {
  .wh(100%,1.6rem);
  background-color: #fff;
  position: fixed;
  top: 1.5rem;
  left: 0%;
  z-index: 999999;
  .flex_contain {
    display: flex;
    flex-wrap: nowrap;
    .wh(100%,100%);
    border-bottom: 0.025rem solid #f1f1f1;

    .flex_item {
      .wh(33%,100%);
      padding-top: 0.4rem;
      &:nth-of-type(3) .text_contain {
        border: 0;
      }
    }
    .text_contain {
      height: 1rem;
      font-size: 0.55rem;
      text-align: center;
      border-right: 0.025rem solid #e4e4e4;

      .sort_icon {
        transition: all 0.5s;
      }
    }
  }
}

.sore_detail_contain {
  background-color: #fff;
  position: absolute;
  top: 1.6rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.55rem;
  border-top: #e4e4e4 1px solid;
  //categroy css
  .category_left {
    .wh(50%,16rem);
    overflow-y: auto;
    background-color: #e4e4e4;

    .category—left-li {
      .wh(100%,1.8rem);
      padding: 0 0.5rem;
    }

    .li-left {
      float: left;
      line-height: 1.8rem;

      img {
        .wh(0.7rem,0.7rem);
        vertical-align: middle;
        margin-right: 0.4rem;
      }
    }
    .li-right {
      float: right;
      margin-top: 0.5rem;
      div {
        float: left;
        background-color: #ccc;
        border-radius: 0.8rem;
        padding: 0 0.1rem;
        margin-right: 0.5rem;
        color: #fff;
      }
    }
  }
  .category_right {
    .wh(50%,16rem);
    overflow-y: auto;
    .category—left-li {
      .wh(100%,1.8rem);
      .all {
        line-height: 1.8rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e4e4e4;
        padding-right: 1rem;
        margin-left: 1rem;
      }
    }
  }
  //排序 css
  ul {
    width: 100%;
    .sort_li {
      .wh(100%,2.5rem);
      display: flex;
      justify-content: space-between;
      line-height: 2.5rem;
      .li_sort_text {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: #e4e4e4 1px solid;
      }
      .li_sort_svg {
        .wh(0.7rem,0.7rem);
        vertical-align: middle;
        margin: 0 0.5rem;
      }
    }
  }
}
//筛选 css
.delivery_way_contain {
  background-color: #fff;
  position: absolute;
  top: 1.6rem;
  left: 0;
  width: 100%;
  font-size: 0.55rem;
  line-height: 1.4rem;
  .flex {
    margin-top: 0.3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .text_svgchangge {
      .wh(4.7rem,1.4rem);
      margin-bottom: 0.5rem;
      border: 0.025rem solid #eee;
      border-radius: 5px;

      text-align: center;
      .span_icon {
        border: 0.025rem solid #e4e4e4;
        line-height: 0;
        padding: 0.05rem 0.1rem;
        margin-right: 0.5rem;
        border-radius: 5px;
      }
    }
  }
  .disflex {
    justify-content: flex-start;
  }

  .filtrate {
    margin: 0.5rem;
  }
  .button_contain {
    display: flex;
    justify-content: space-between;
    background-color: #f1f1f1;
    padding: 0.5rem;

    .clear_all {
      background-color: #fff;
      margin-right: 0.5rem;
    }
    .confrim {
      background-color: #56d176;
      color: #fff;
    }
    div {
      .wh(50%,1.8rem);
      text-align: center;
      line-height: 1.8rem;
      font-size: 0.8rem;
      border-radius: 0.2rem;
    }
  }
}

.svg-icon {
  .wh(0.7rem,0.7rem);
  vertical-align: middle;
  margin-right: 0.4rem;
}
//categroyli 选中背景变白
.li_active {
  background-color: #fff;
}
//subcategroy 选中字体变蓝
.subcategroy_active {
  span {
    color: @blue;
  }
}
//分类选中 字体变蓝，图标旋转180度
.choose_type {
  span {
    color: @blue;
  }
  .sort_icon {
    fill: @blue;
    transform: rotateZ(180deg);
  }
}
//筛选item点中后边框变蓝
.border_blue {
  border: solid @blue 0.5px !important;
  color: @blue !important;
}
//transition css过渡
.sliod_in-enter-active,
.sliod_in-leave-active {
  transition: all 0.5s ease;
}

.sliod_in-enter,
.sliod_in-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
//商铺列表
.shop_contain {
  padding-top: 1.5rem;
}
</style>
