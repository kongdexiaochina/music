<template>
  <div id="app">
    <section v-if="isShow">
      <!-- 头部 -->
      <content-header-top />
      <!-- 导航 -->
      <content-nav-bar />
    </section>
    <keep-alive :include="['Recommend', 'HotSong', 'Search']">
      <router-view></router-view>
    </keep-alive>
    <common-small-player v-if="isSmallPlayer"/>
  </div>
</template>

<script>
// 引入适用性比较低的组件
import ContentHeaderTop from './components/content/HeaderTop'
import ContentNavBar from './components/content/NavBar'
// 引入适用性比较高的组件
import CommonSmallPlayer from './components/common/SmallPlayer'
export default {
  name: 'app',
  data () {
    return {
      // 控制头部组件的状态
      isShow: true,
      isSmallPlayer: false
    }
  },
  watch: {
    // 深度检测路由对象
    $route: {
      handler (to, from) {
        // 如果我们to(要去的路径) 等于Detail那么就不显示头部组件，反之显示
        if (to.name === 'Detail' || to.name === 'Player' || to.name === 'Comment') {
          this.isShow = false
        } else {
          this.isShow = true
        }
        // 如何去Palyer和comment组件那么我们就不让小播放器组件显示
        if (to.name === 'Player' || to.name === 'Comment') {
          this.isSmallPlayer = false
        } else {
          this.isSmallPlayer = true
        }
      },
      deep: true
    }
  },
  components: {
    ContentHeaderTop,
    ContentNavBar,
    CommonSmallPlayer
  }
}
</script>

<style lang="scss">
  #app {
    font: 14px/1.5 Helvetica, sans-serif;
    color: #333;
    & > section {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 108px;
    }
    & ~ div {
      display: none;
    }
  }
</style>
