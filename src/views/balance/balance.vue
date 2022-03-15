 <template>
  <div class="page">
        <head-top head-title="我的余额" go-back='true'></head-top>
        <section class="content_container">
            <section class="content">
                <header class="content_header">
                    <span class="content_title_style">当前余额</span>
                    <section class="contetn_description">
                        <img src="../../images/description.png" height="24" width="24">
                        <router-link to="/balance/detail" class="content_title_style">余额说明</router-link>
                    </section>
                </header>
                <p class="content_num">
                    <span>0.00</span>
                    <span>元</span>
                </p>
                <div class="promit_button">提现</div>
            </section>
        </section>
        <p class="deal_detail">交易明细</p>
        <div class="no_log">
            <p>暂无明细记录</p>
        </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headTop from '@/components/heder.vue'
import alertTip from '@/components/rating.vue'

export default {
  data () {
    return {
      showAlert: false,
      alertText: null
    }
  },
  mounted () {

  },
  components: {
    headTop,
    alertTip
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
 @import '../../style/mixin';

    .page{
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .content_container{
        padding: .3rem;
        background-color: $blue;
        .content{
            padding: .4rem;
            background-color: #fff;
            border-radius: .15rem;
            .content_header{
              .fj;
                font-size: .55rem;
                .contetn_description{
                    display: flex;
                    align-items: center;
                    img{
                      .wh(.6rem, .6rem);
                        margin-right: .2rem;
                    }
                    .content_title_style{
                        color: @blue;
                    }
                }
                .content_title_style{
                    color: #666;
                }
            }
            .content_num{
                span:nth-of-type(1){
                  .sc(1.8rem, #333);
                }
                span:nth-of-type(2){
                  .sc(.7rem, #333);
                }
            }
            .promit_button{
              .wh(100%, 2rem);
              .sc(.8rem, #fff);
                border-radius: 0.15rem;
                line-height: 2rem;
                margin-top: 1rem;
                text-align: center;
                background-color: #ccc;
            }
        }
    }
    .deal_detail{
      .sc(.6rem, #999);
        line-height: 2rem;
        padding-left: .5rem;
    }
    .no_log{
        text-align: center;
        margin-top: 1rem;
        img{
          .wh(8rem, 5rem);
        }
        p{
            margin-top: .5rem;
            font-size: .7rem;
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
