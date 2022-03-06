<template>
  <div class="home">
      <header-top loginUp="true">
        <template v-slot:logo="{msg}" >
          <span class="head_logo" @click="reload">{{msg}}</span>
        </template>
      </header-top>
      <nav class="city_nav">
          <div class="city_tip">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
        </nav>
      <router-link :to="'/city/' + guesscityId" class="guess_city">
        <span>{{guesscity}}</span>
      </router-link>
      <section class="hot_city">
        <h4 class="city_titie">热门城市</h4>
        <ul class="citylistul clear">
          <router-link tag="li" v-for='item in hotcity' :key="item.id" :to="'/city/'+item.id">{{item.name}}
          </router-link>
        </ul>
      </section>
      <section class="group_city">
        <ul class="letter_classify">
          <li class="letter_classify_li" v-for="(value,key) in sortgroupcity" :key="key">
            <ul class="citylistul clear">
              <h4 class="city_titie">{{key}}
                <span v-if="key==='A'">(按字母排序)</span>
              </h4>
            <router-link tag="li" v-for='item in value' :key="item.id" :to="'/city/'+item.id">{{item.name}}
          </router-link>
            </ul>

          </li>

        </ul>
      </section>
  </div>
</template>

<script>
import { guessCity, hotCity, groupCity } from '@/api/getData.js'
import headerTop from '@/components/heder.vue'
export default {
  name: 'Home',
  components: {
    headerTop
  },
  data () {
    return {
      guesscity: '',
      guesscityId: '',
      hotcity: [],
      groupcity: {}
    }
  },
  created () {
    guessCity().then((data) => {
      this.guesscity = data.data.name
      this.guesscityId = data.data.id
      console.log(data)
      this.$store.commit({
        type: 'location/setLocation',
        latitude: data.data.latitude,
        longitude: data.data.longitude

      })
    })
    hotCity().then((data) => {
      this.hotcity = data.data
    })
    groupCity().then((data) => {
      this.groupcity = data.data
    })
  },
  methods: {
    // 点击刷新界面
    reload () {
      window.location.reload()
    }
  },
  computed: {
    // 将获取的数据按照A-Z字母开头排序
    sortgroupcity () {
      const sortobj = {}
      for (let i = 65; i <= 90; i++) {
        if (this.groupcity[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)]
        }
      }
      return sortobj
    }
  }
}
</script>
<style lang="less" scoped>
@import '../style/mixins.less';
.head_logo{
  left: .6rem;
  font-weight: 400;
  display: inline-flex;
  .sc(0.7rem, #fff);
  .ct()
}
.city_nav{
  padding-top: 1.5rem;
  border-top: 1px solid @bc;
  background-color: #fff;
  .city_tip{
    .fj();
    line-height: 1.45rem;
    padding: 0 0.45rem;
    span:nth-child(1){
      .sc(.5rem,#666)
    };
    span:nth-child(2){
      .sc(0.45rem,#9f9f9f)
    }
  }

}
.guess_city{
  .fj();
  height: 1.8rem;
  padding: 0 0.45rem;
  border-top: 1px solid @bc;
  margin-bottom: 1rem;
  border-bottom: 2px solid @bc;
  background-color: #fff;
  span:nth-of-type(1){
  color: @blue;

 }

}
.hot_city{
  background-color: #fff;
  margin-bottom: 0.4rem;

}
.citylistul{
  li{
    float: left;
    text-align: center;
    border-bottom: 0.025rem solid @bc;
    border-right: 0.025rem solid @bc;
    .wh(25%,1.75rem);
    font-size: .5rem;
    line-height: 1.75rem;
    color:@blue;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:nth-of-type(4n){
      border-right: none;
    }

  }
}
.city_titie{
    color: #666;
    text-indent: 0.45rem;
    font-size: .5rem;
    font-family: "Helvetica Neue";
    line-height: 1.45rem;
    border-top: 2px solid @bc;
    border-bottom: 1px solid @bc;
  span{
    .sc(0.475rem, #999);
  }
  }
  .letter_classify_li{
    background-color: #fff;
    margin-bottom: 1rem;
  }
</style>
