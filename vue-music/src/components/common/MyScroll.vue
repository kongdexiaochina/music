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
  @mixin wrapper($top, $left) {
    position: absolute;
    left: 0;
    right: 0;
    top: $top;
    bottom: $left;
    overflow: hidden;
  }
  // 默认的滚动样式
  .wrapper {
    @include wrapper(125px,0);
  }
  // 推荐音乐的滚动样式
  .recommend_wrapper {
    @include wrapper(125px,0);
  }
  // 推荐歌单详情样式
  .detail_wrapper {
    @include wrapper(0,0);
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
    @include wrapper(52px,0);
    z-index: 20;
    width: 100%;
    margin: auto;
  }
  // 热歌榜样式部分
  .hotsong_wrapper {
    @include wrapper(105px,0);
  }
  // 搜索歌词样式部分
  .hotlist_wrapper {
    @include wrapper(65px,65px);
    padding: 15px 10px 0;
    text-align: left;
  }
</style>
