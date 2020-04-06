<template>
  <div id="app">
    <router-view></router-view>
    <common-small-player v-if="isShow"/>
  </div>
</template>

<script>
// 引入适用性比较高的组件
import CommonSmallPlayer from './components/common/SmallPlayer'
export default {
  name: 'app',
  data () {
    return {
      isShow: true
    }
  },
  watch: {
    // 深度检测$route 并且第一次也可以检测到数据
    $route: {
      handler (to, from) {
        // 如果是那么就不让迷你播放器显示 也就是播放
        if (to.name === 'Player' || to.name === 'Comment') {
          this.isShow = false
        } else { // 反之显示并且播放
          this.isShow = true
        }
      },
      immediate: true // immediate 数据初始化(created)的时候也会检测到数据的变化
    }
  },
  components: {
    CommonSmallPlayer
  }
}
</script>

<style lang="scss">
  #app {
    font: 14px/1.5 Helvetica, sans-serif;
    color: #333;
  }
</style>
