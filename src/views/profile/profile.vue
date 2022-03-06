<template>
    <div class="profile_page">
        <header-top goBack='goback' headTitle='我的'>
        </header-top>
        <section class="profile_userInfo">
            <router-link :to='userInfo ? "/profile/info" :"/login"' class="profile_photo_contain">
                <img :src="'//elm.cangdu.org/img/'+ avatar" alt="" v-if="userInfo" class="profile_photo">
             <svg class="privateImage-svg profile_photo"   v-else>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
              </svg>
             <div class="profile_number">
                  <span class="profile_username">{{username}}</span>
                <p class="profile_mobile">
                    <svg class="privateImage-svg" >
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile" id='svg_mobile'>
                        </use>
                    </svg>
                    <span>{{mobile}}</span>
              </p>
              </div>
              <svg class="privateImage-svg" >
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right" >
                        </use>
                    </svg>
            </router-link>
        </section>
        <!--账户信息-->
        <section class="account_info">
           <ul class="clear">
                <router-link to="/balance" tag="li" class="info-data-link">
                <span class="info-data-top"><b>{{parseInt(balance).toFixed(2)}}</b>元</span>
                <span class="info-data-bottom">我的余额</span>
                </router-link>
                <router-link to="/balance" tag="li" class="info-data-link">
                <span class="info-data-top"><b>{{discounts}}</b>个</span>
                <span class="info-data-bottom">我的优惠</span>
                </router-link>
                <router-link to="/balance" tag="li" class="info-data-link">
                <span class="info-data-top"><b>{{poinNumber}}</b>分</span>
                <span class="info-data-bottom">我的积分</span>
                </router-link>
           </ul>
        </section>
        <!--个人中心-->
        <section class="profile_item">
            <router-link class="myorder" to="/order">
                <aside >
                     <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
                        </svg>
                </aside>
                    <div class="myorder-div">
                        <span>我的订单</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
            </router-link>
                        <a class="myorder" to="https://home.m.duiba.com.cn/#/chome/index'">
                <aside >
                     <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
                        </svg>
                </aside>
                    <div class="myorder-div">
                        <span>积分商城</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
            </a>
                        <router-link class="myorder" to="/vipcard">
                <aside >
                     <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
                        </svg>
                </aside>
                    <div class="myorder-div">
                        <span>饿了么会员卡</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
            </router-link>

        </section>
        <!--服务中心-->
        <section class="profile_servie">
            <router-link to="/service" class="myservie">
                <svg fill="#3cabff">
                     <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
                 </svg>
                 <div class="myservie_item">
                     <span>服务中心</span>
                      <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>

                 </div>
            </router-link>
            <router-link to="/download" class="myservie">
                <svg fill="#3cabff">
                     <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
                 </svg>
                 <div class="myservie_item">
                     <span>下载饿了么app</span>
                      <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>

                 </div>
            </router-link>
        </section>
       <foot></foot>
    </div>
</template>
<script>
import headerTop from '@/components/heder.vue'
import foot from '@/components/footer.vue'
import { mapState } from 'vuex'
export default {
  components: {
    headerTop,
    foot

  },
  data () {
    return {
      avatar: '',
      username: '',
      balance: 0,
      discounts: 0,
      poinNumber: 0
    }
  },
  created () {
    this.avatar = this.userInfo.avatar
    this.username = this.userInfo.username
    this.mobile = this.userInfo.mobile || '暂未绑定手机号'
    this.balance = this.userInfo.balance
    this.discounts = this.userInfo.gift_amount
    this.poinNumber = this.userInfo.point
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  }
}
</script>
<style lang="less" scoped>
@import '../../style/mixins.less';
.profile_page{
    font-size: 16px;
    font-family: Helvetica Neue,Tahoma,Arial;

    .profile_userInfo{
        padding-top: 1.5rem;
         .profile_photo_contain{
        display:block;
        display: flex;
        justify-content: space-between;

    //      box-align: center;
    // -webkit-box-align: center;
            align-items: center;
            background:@blue;
            padding: .666667rem .6rem;

            .profile_number{
                display: flex;
                flex-direction: column;
                margin-left: -3.8rem;
                  .profile_username{
                         color: #fff;
                         font-weight: 700;
                         font-size: .8rem
                  }
                .profile_mobile{
                     span{
                        color: #fff;
                        font-size: .6rem
                       }

                }

                       #svg_mobile{
                           fill: rgb(255, 255, 255);
                       }

            }
            .profile_photo{
                .wh(2.8125rem,2.8125rem);
                 border-radius: 50%;

            }
                .privateImage-svg{
                    .wh(.8rem,.8rem);
                    vertical-align: middle;
                       fill: rgb(255, 255, 255)
                            }

    }
    }

}
.info-data-link{
    float: left;
    width: 33%;
    display: flex;
    text-align: center;
    flex-direction: column;
    background-color:#fff;
    padding:.5rem 0 .5rem 0;
    border-right: 1px solid #f1f1f1;
   .info-data-top{
       font-size: 12px;
       b{
           color: #f90;
           font-size: 1.2rem;
           font-weight: 700;
       }
   }
   .info-data-bottom{
       font-size: .45rem;
       color: #666;
       padding-top: .1rem;
   }

}
.info-data-link:nth-of-type(2){
    .info-data-top{
        b{
            color: #ff5f3e;
        }
    }
}
.info-data-link:nth-of-type(2){
    .info-data-top{
        b{
                color: #6ac20b
        }
    }
}
.profile_item{
    margin-top: .3rem;
    background-color: #fff;
    .myorder{
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        padding: .5rem .5rem .5rem .5rem;
        aside {
            .wh(.7rem,.7rem);
            margin-top: .1rem;
            svg{
                .wh(100%,100%);
            }
        }
        .myorder-div{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-left: .5rem;

            .myorder-divsvg{
                .wh(.7rem,.7rem);
                margin-top: .1rem;

            svg{
                    .wh(100%,100%);

                }
            }
        }
    }
    .myorder:nth-of-type(2){
        aside{
            svg{
                fill:#fc7b53
            }
        }
    }
      .myorder:nth-of-type(3){
        aside{
            svg{
                fill:#ffc636
            }
        }
    }

}
.profile_servie{
    background-color: #fff;
    margin-top: .5rem;

    .myservie{
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        padding: .5rem .5rem .5rem .5rem;
        svg{
            .wh(.7rem,.7rem);
            margin-top: .1rem;

        }
        .myservie_item{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-left: .5rem;
    }

    }
}

</style>
