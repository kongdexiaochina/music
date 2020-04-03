<template>
  <div id="app">
    <section>
      <!-- 头部 -->
      <content-header-top />
      <!-- 导航 -->
      <content-nav-bar />
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
// 引入适用性比较低的组件
import ContentHeaderTop from './components/content/header/HeaderTop'
import ContentNavBar from './components/content/navbar/NavBar'
export default {
  name: 'app',
  components: {
    ContentHeaderTop,
    ContentNavBar
  }
}
</script>

<style lang="scss">
  #app {
    font: 14px/1.5 Helvetica, sans-serif;
    color: #333;
    section {
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
