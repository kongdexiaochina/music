<template>
  <div id="app">
    <content-slide-translate :name="name">
      <template #slide>
        <router-view></router-view>
      </template>
    </content-slide-translate>
    <div v-show="isError">
      <common-small-player v-show="isShow"/>
    </div>
    <div  v-show="!isError" class="error">
      <h1>歌曲没有获取到</h1>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入适用性比较高的组件
import CommonSmallPlayer from './components/common/SmallPlayer'
// 引入适用性比较低的组件
import ContentSlideTranslate from './components/content/SlideTranslate'
export default {
  name: 'app',
  data () {
    return {
      isShow: true,
      name: ''
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
        // 根据to和from的值设置不同的动画跳转类名
        if (to.name === 'Detail' && from.name === 'Recommend') {
          this.name = 'left'
        } else if (to.name === 'Recommend' && from.name === 'Detail') {
          this.name = 'right'
        } else if (to.name === 'Player' || from.name === 'Player') {
          this.name = 'scale'
        } else {
          this.name = ''
        }
      },
      depp: true // immediate 数据初始化(created)的时候也会检测到数据的变化
    }
  },
  computed: {
    ...mapState(['isError'])
  },
  components: {
    CommonSmallPlayer,
    ContentSlideTranslate
  }
}
</script>

<style lang="scss">
  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    font: 14px/1.5 Helvetica, sans-serif;
    color: #333;
  }
  .error {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background-color: #545454;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
  }
</style>
