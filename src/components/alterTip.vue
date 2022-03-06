<template>
    <div class="alter_tip_containt" v-if='showTip'>
            <div class="text_tip_containt">
                <p>{{alterTitle}}</p>
        <div @click="closeTip" class="confrim">确认</div>
            </div>

    </div>
</template>

<script>
export default {

  props: ['showTip', 'alterTitle'],
  methods: {
    closeTip () {
      this.$emit('closeTip')
    }
  }
}
</script>
<style lang="less" scoped>
@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alter_tip_containt{
    position: fixed;
       top: 0%;
       left: 0%;
       right: 0%;
       bottom: 0%;
       z-index: 999999;
        .text_tip_containt{
            position: absolute;
            top:50%;
            left: 50%;
            margin-top: -6rem;
            margin-left: -6rem;
            width: 12rem;
            animation: tipMove .4s;
            background-color: rgba(255,255,255,1);
             border: 1px;
        border-radius: 0.25rem;
            p{
                text-align: center;

            }
            .confrim{
                text-align: center;
                background-color:#4cd964;
                border-bottom-left-radius:.5rem ;
                border-bottom-right-radius:.5rem ;
                color: #fff;
                line-height: 1.8rem;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>
