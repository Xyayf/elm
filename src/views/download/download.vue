 <template>
  <div class="download_page">
        <head-top head-title="下载" go-back='true'></head-top>
        <section class="dowload_container">
            <img src='../../images/elmlogo.jpeg' class="logo_img">
            <p>下载饿了么APP</p>
            <div class="determine" @click="download">下载</div>
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import headTop from '@/components/heder.vue'
import alertTip from '@/components/alterTip.vue'

export default {
  data () {
    return {

      showAlert: false,
      alertText: null
    }
  },
  created () {

  },

  components: {
    headTop,
    alertTip
  },

  methods: {
    download () {
      this.showAlert = true
      this.alertText = 'IOS用户请前往AppStore下载'
    }
  }

}
</script>

<style lang="less" scoped>
    @import '../../style/mixin';

    .download_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .dowload_container{
        text-align: center;
        .logo_img{
           border-radius: 1rem;
            margin-top: 1rem;
        }
        p{
            .sc(.8rem, #666);
            margin-bottom: 1rem;
        }
        .determine{
            background-color: #4cd964;
            .sc(.7rem, #fff);
            text-align: center;
            margin: 0 .7rem;
            line-height: 1.8rem;
            border-radius: 0.2rem;
            margin-top: 0.5rem;
        }
    }
</style>
