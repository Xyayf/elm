<template>
  <div class="login">
    <header-top headTitle='密码登陆' goBack='goback'>
    </header-top>
            <form class="loginForm" v-if="logiWay">
            <section class="input_container phone_number">
                <input type="text" placeholder="账号密码随便输入" name="phone" maxlength="11" v-model="phoneNumber">
                <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime" >获取验证码</button>
                <button @click.prevent v-show="computedTime" >已发送({{computedTime}}s)</button>
            </section>
            <section class="input_container">
                <input type="text" placeholder="验证码" name="mobilCode" maxlength="6" v-model="mobilCode">
            </section>
        </form>
        <form class="loginForm" v-else >
          <section class="input_container">
            <input type="text" placeholder="账号"  v-model="phoneNumber" name="phone" maxlength="11" @blur="validphone">
          </section>
          <section class="input_container">
            <input type="text" placeholder="密码" v-if="showPassword" v-model="password">
            <input type="password" placeholder="密码" v-else v-model="password">
            <div class="button_switch" :class="{change_to_text:showPassword}">
              <div class="circle_button " :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
                  <span>abc</span>
                    <span>...</span>
            </div>
          </section>
          <section class="input_container">
            <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
            <img :src="codesrc">
            <div class="change_img" @click="getcaptchasCode">
             <p>看不清</p>
             <p>换一张</p>
            </div>
          </section>
        </form>
        <section class="description_p">
          <p class="login_tips">温馨提示：未注册过的账号，登录时将自动注册</p>
          <p class="login_tips">注册过的用户可凭账号密码登录</p>
        </section>
        <div class="login_button" @click="login">登录</div>
         <router-link to="/forget" class="to_forget" v-if="!logiWay">重置密码？</router-link>
         <alter-tip :showTip='showTips' @closeTip='closeTip' :alterTitle='alterTitle'></alter-tip>
  </div>
</template>
<script>
import headerTop from '@/components/heder.vue'
import { getcaptchas } from '@/api/getData.js'
import alterTip from '@/components/alterTip.vue'

export default {
  data () {
    return {
      loginWay: true,
      phoneNumber: '',
      computedTime: 0,
      mobilCode: '',
      logiWay: false,
      showPassword: false,
      password: '',
      codeNumber: '',
      codesrc: '',
      showTips: false,
      alterTitle: '操作完成'

    }
  },
  components: {
    headerTop,
    alterTip
  },
  computed: {
    rightPhoneNumber () {
      return /^1\d{10}$/gi.test(this.phoneNumber)
    }
  },
  created () {
    this.getcaptchasCode()
  },
  methods: {
    // 获取短信验证码
    getVerifyCode () {
      this.computedTime = 5
      const timer = setInterval(() => {
        if (this.computedTime > 0) {
          this.computedTime -= 1
        } else {
          clearInterval(timer)
        }
      }, 1000)
      // 验证用户是否存在
    },
    // 改变密码显示类型
    changePassWordType () {
      this.showPassword = !this.showPassword
    },
    // 获取图片验证码
    async getcaptchasCode () {
      const { data } = await getcaptchas()
      this.codesrc = data.code
    },
    // 验证号码是否合法
    validphone () {
      if (/^1\d{10}$/gi.test(this.phoneNumber)) {

      } else {
        this.phoneNumber = ''
      }
    },
    // 登录
    async login () {
      if (this.logiWay) {

      } else {
        if (!this.phoneNumber) {
          this.showTips = true
          this.alterTitle = '号码不能为空'
        } else if (!this.password) {
          console.log('密码不能为空')
        } else if (!this.codeNumber) {
          console.log('验证码不能为空')
        } else {
          const data = await this.$store.dispatch({
            type: 'user/login',
            username: this.phoneNumber,
            password: this.password,
            captchaCode: this.codeNumber

          })
          console.log(data)
          if (data.data.user_id) {
            this.$router.push('/profile')
          } else {
            console.log(data.data.message)
            this.getcaptchasCode()
          }
        }
      }
    },
    // 控制弹出层
    closeTip () {
      this.showTips = false
      // 剩下的交互动作
    }
  }
}
</script>
<style lang="less" scoped>
@import '../style/mixins.less';
.loginForm{
  padding-top:1.95rem;
  background-color: #fff;
  .input_container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .6rem .8rem;
    border-bottom: 1px solid #f1f1f1;
    p{
      .sc(.5rem,#666)
    }
    input{
        .sc(.7rem, #666);
      }
     button{
       .sc(.65rem, #fff);
       font-family: Helvetica Neue,Tahoma,Arial;
       padding: .28rem .4rem;
       border: 1px;
       border-radius: 0.15rem;
      }
  }

}

.right_phone_number{
  background-color: #4cd964;
}
.phone_number{
    padding: .3rem .8rem;
}
.button_switch{
  .wh(2rem,.7rem);
  background-color:#ccc;
  border-radius: 0.5rem;
  text-align: center;
  .sc(0.5rem,black);
  position: relative;
  .circle_button{
    transition: all .3s;
    .wh(1rem,1rem);
            position: absolute;
            top: -0.2rem;
            z-index: 1;
    background-color: #f1f1f1;
    border-radius: 50%;

  }
  .trans_to_right{
  transform: translateX(1.2rem);

}

}
.change_to_text{
  background-color: #4cd964;
}
.login_tips{
  .sc(.5rem,red);
  padding: .5rem .5rem 0 .6rem;
}
.login_button{
  text-align: center;
  background-color: #4cd964;
  .wh(85%,2rem);
  line-height: 2rem;
  margin: 0 auto;
  border-radius: .2rem;
  .sc(.75rem,#fff);
  margin-top: .5rem;
}
.to_forget{
  float: right;
  margin:.5rem 1.5rem 0 0;
  .sc(.55rem,@blue)
}

</style>
