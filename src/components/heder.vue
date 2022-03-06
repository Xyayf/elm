<template>
    <header class="head_top">
      <slot name="logo" msg='ele.com' ></slot>
      <slot name="search"></slot>
      <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
      </section>
      <router-link class="login_up" v-if="loginUp" :to="userInfo? '/profile':'/login'">
            <span class="login_span" v-if="userInfo">{{userInfo.username}}</span>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
      <section class="title_head" v-if="headTitle">
          <span class="text">{{headTitle}}</span>
      </section>
    </header>

</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    goBack: {
      default: false

    },
    headTitle: {
      default: false

    },
    loginUp: {
      default: false

    }

  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  }

}
</script>
<style lang="less" scoped>

  @import '../style/mixins.less';
  .head_top{
    .wh(100vw,1.5rem);
    background-color: @blue;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

  }

.head_goback{
  float: left;
  .wh(0.6rem,1rem);
  line-height: 1.9rem;
  margin-left: .4rem;
}
.login_up{
  float: right;
  .sc(0.65rem, #fff);
  height: 100%;
  line-height: 1.5rem;
  .login_span{
    color: #fff;
    margin-right: 0.4rem;
  }
  .user_avatar{
    fill: #fff;
     .wh(.8rem, .8rem);
  }

}
.title_head{
  .center();
  width: 50%;
  text-align: center;
  color: #fff;

  span{
    color: #fff;
    font-size: .7rem;
    line-height: 1.5rem;
  }
}
</style>
