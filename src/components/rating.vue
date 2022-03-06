<template>
    <div class="rating">
       <div class="standard-flex">
            <div class="start_contain">
            <svg class="grey_fill" v-for="num in 5" :key="num" >
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
            </svg>
        </div>
        <span>{{rating}}</span>
       </div>

        <div class="overflow" :style="'width:'+rating*2/5+'rem'">
            <div class="start_contain">
            <svg class="start_fill" v-for="num in 5" :key="num" >
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
            </svg>
        </div>

        </div>

    </div>
</template>
<script>
export default {
  props: ['rating']
//   created () {
//     console.log(this.rating)
//   }
}
</script>
<style lang="less" scoped>
.rating{
     position: relative;
    .overflow{

        overflow: hidden;
        position: absolute;
        top:0%;
        left: 0%;

    }
    .standard-flex{
        display: flex;
       span{
            font-size: .2rem !important;
        color: #ff9a0d;
        margin: -.15rem 0 0 .2rem;
       }
    }

}
.start_contain{
    display: flex;
    width: 2rem;
    height: .4rem;
    //svg外层宽度会影响里面svg的大小
    .grey_fill{

        fill:grey
    }
    .start_fill{

        fill:#ff9a0d;

    }

}
</style>
