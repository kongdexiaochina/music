<template>
  <div class="home">
    <section>
      <!-- 头部 -->
      <content-header-top />
      <!-- 导航 -->
      <content-nav-bar />
    </section>
      <!-- 缓存指定的多个组件 -->
    <keep-alive :include="['Recommend', 'HotSong', 'Search']">
      <router-view></router-view>
    </keep-alive>
    <common-small-player />
  </div>
</template>

<script>
// 引入适用性比较低的组件
import ContentHeaderTop from '../../components/content/HeaderTop'
import ContentNavBar from '../../components/content/NavBar'
// 引入适用性比较高的组件
import CommonSmallPlayer from '../../components/common/SmallPlayer'
export default {
  name: 'Home',
  components: {
    ContentHeaderTop,
    ContentNavBar,
    CommonSmallPlayer
  }
}
</script>

<style lang="scss" scoped>
  .home {
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
