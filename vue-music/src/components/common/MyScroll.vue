<template>
  <div :class="className" ref="wrapper">
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'MyScroll',
  data () {
    return {
      scroll: null // BScroll插件里面的所有方法和属性
    }
  },
  // 在DOM挂载完毕的时候 我们使用BScroll插件进行滚动
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  // props教验传递过来的数据
  props: {
    className: {
      type: String,
      default: 'wrapper'
    }
  }
}
</script>

<style scoped lang="scss">
  // 默认的滚动样式
  .wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 125px;
    bottom: 0;
    overflow: hidden;
  }
  // 推荐音乐的滚动样式
  .recommend_wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 125px;
    bottom: 0;
    overflow: hidden;
  }
  // 推荐歌单详情样式
  .detail_wrapper {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
  }
  // 歌曲歌词的样式
  .text_wrapper {
    position: relative;
    height: 40vw;
    margin-top: 14px;
    overflow: hidden;
    .content {
      font-size: 16px;
      line-height: 1.5;
      overflow: hidden;
      text-align: center;
      color: hsla(0, 0%, 100%, 0.6);
    }
  }
  // 歌曲评论的样式
  .comment_wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 52px;
    bottom: 0;
    z-index: 20;
    width: 100%;
    margin: auto;
    overflow: hidden;
  }
  // 热歌榜样式部分
  .hotsong_wrapper {
    position: absolute;
    top: 108px;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
  }
</style>
