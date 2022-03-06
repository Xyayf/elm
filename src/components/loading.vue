<template>
  <div class="loading">
    <div
      class="imgbackground_contain"
      :style="{ backgroundPositionY: -(position % 7) * 100 + 'px' }"
    ></div>
    <div class="shadow">
            <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      class="load_ellipse"
    >
      <ellipse
        cx="26"
        cy="10"
        rx="26"
        ry="10"
        style="fill: rgb(221, 221, 221); stroke: none"
      ></ellipse>
    </svg>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      position: 0,
      timer: null
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.position++
    }, 1500)
  }
}
</script>
<style lang="less" scoped>
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;

}
.imgbackground_contain {
  width: 100px;
  height: 100px;
  background: url(../images/icon_loading.png) no-repeat 0, 0;
  animation: jump 1s ease infinite;
}
@keyframes jump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(32px);
  }
  100% {
    transform: translateY(0);
  }
}
.shadow{
    position: absolute;
    left: 50%;
    bottom: -100px;
    transform: translateX(-50%);
    svg{
        width: 55px;
        height: 22px;
        animation:shadow 1s ease infinite;

    }
}
@keyframes shadow{
    0%{
        transform: scale(1);
    }
    50%{
        transform: scale(1.3);
    }
    100%{
        transform: scale(1);
    }
}
</style>
