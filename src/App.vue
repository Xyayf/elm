<template>
  <div id="app">
    <router-view/>
    <svg-icons></svg-icons>
  </div>
</template>
<script>
import svgIcons from '@/components/svg.vue'
export default {
  components: {
    // 全局注入svgIcon
    svgIcons
  },
  data () {
    return {
      ok: true
    }
  },
  methods: {
    changok () {
      this.ok = !this.ok
    }

  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.transition{

  width: 375px;
  height: 667px;
  background-color: red;
}
</style>
