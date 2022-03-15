<template>
  <div class="msite_page">
    <header-top :headTitle="headTitle">
      <router-link to="/search/geohash" class="link_search" slot="search">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke="rgb(255,255,255)"
            stroke-width="1"
            fill="none"
          />
          <line
            x1="14"
            y1="14"
            x2="20"
            y2="20"
            style="stroke: rgb(255, 255, 255); stroke-width: 2"
          />
        </svg>
      </router-link>
    </header-top>
   <nav class="msite_nav">
       <div class="swiper-container" >
           <div class="swiper-wrapper" >
                <div class="swiper-slide food_types_container" v-for="(footitem,index) in foodType" :key="index">
                    <router-link :to="{path:'/food',query:{
                    geohash,
                    title:item.title,
                    restaurant_category_id:getCategoryId(item.link)

                }}" class="item" v-for="(item) in footitem" :key="item.id">
                    <figure>
                    <img :src="imgBadeUrl+item.image_url" alt="">
                    <figcaption>{{item.title}}</figcaption>
                    </figure>
                </router-link>
                </div>
           </div>
            <div class="swiper-pagination"></div>
       </div>
       <!-- <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else> -->
   </nav>

    <foot></foot>
  </div>
</template>
<script>
import foot from '@/components/footer.vue'
import headerTop from '@/components/heder.vue'
import { getIndexEntry } from '@/api/getData.js'
import Swiper from 'swiper'
import '@/style/swiper.min.css'

export default {
  components: {
    foot,
    headerTop

  },
  data () {
    return {
      headTitle: '',
      indexEntrys: [],
      geohash: '31.22299,121.36025',
      imgBadeUrl: '',
      foodType: []
    }
  },
  created () {
    this.getIndexEntrys()
  },
  mounted () {
    // this.initSwiper()
  },
  methods: {
    // 获取商品分类
    async getIndexEntrys () {
      try {
        const { data } = await getIndexEntry()
        // 分页swiper
        const resArr = [...data]
        const resArrlength = resArr.length
        const foodArr = []
        for (let i = 0, j = 0; i < resArrlength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8)
        }
        this.foodType = foodArr
        this.initSwiper()
      } catch (err) {
        console.log(err)
      }
    },
    // 解码url
    getCategoryId (url) {
      const urldata = decodeURIComponent(url.split('=')[1].replace('&target_name', ''))
      if (/restaurant_category_id/gi.test(urldata)) {
        return JSON.parse(urldata).restaurant_category_id.id
      } else {
        return ''
      }
    },
    // 初始化 swiper
    initSwiper () {
      // eslint-disable-next-line no-new
      new Swiper('.swiper-container', {
        autoplay: 5000,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true

      })
    }
  }

}
</script>
<style lang="less" scoped>
@import '../../style/mixins.less';
.link_search{
    .wh(.7rem,.7rem);
    float: left;
    margin-left: .5rem;
    svg{
        .wh(100%,100%)
    }
}
.msite_page {
  padding-top: 1.5rem ;
  .msite_nav{
    background-color: #fff;

  }

  .item{
      display: block;
      float: left;
      padding: .5rem;
      figure{
          width: 2.8rem;
          img{
          .wh(1.8rem,1.8rem);
          padding-left: .4rem;
      }
      figcaption{
          font-size: .55rem;
          color: #666;
          text-align: center;
      }
      }

  }
}

</style>
