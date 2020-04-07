<template>
  <div class="home">
    <section>
      <!-- 头部 -->
      <content-header-top />
      <!-- 导航 -->
      <content-nav-bar />
    </section>
      <!-- 缓存指定的多个组件 -->
    <content-slide-translate :name="name">
      <template #slide>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </template>
    </content-slide-translate>
  </div>
</template>

<script>
// 引入适用性比较低的组件
import ContentHeaderTop from '../../components/content/HeaderTop'
import ContentNavBar from '../../components/content/NavBar'
import ContentSlideTranslate from '../../components/content/SlideTranslate'
export default {
  name: 'Home',
  data () {
    return {
      name: ''
    }
  },
  watch: {
    // 实时监测路由对象 并且修改对应的translate动画类名
    $route: {
      handler (to, from) {
        if (from.path === '/') {
          return
        }
        if (to.meta.index > from.meta.index) {
          this.name = 'left'
        } else {
          this.name = 'right'
        }
      },
      deep: true
    }
  },
  components: {
    ContentHeaderTop,
    ContentNavBar,
    ContentSlideTranslate
  }
}
</script>

<style lang="scss" scoped>
  .home {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
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
