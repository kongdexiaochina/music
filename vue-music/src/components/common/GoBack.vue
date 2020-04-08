<template>
  <div :class="className" @click="handleClick">
    <h2>返回</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'GoBack',
  methods: {
    // 使用编导式导航跳转到上一个历史页面部分
    handleClick () {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState(['pathname'])
  },
  // props教验传递过来的数据
  props: {
    className: {
      type: String,
      default: 'detail_goback'
    }
  }
}
</script>

<style scoped lang="scss">
  $color: #ffffff;
  @mixin goBack($type, $top, $left) {
    position: $type;
    top: $top;
    left: $left;
    color: $color;
    padding-left: 13px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .detail_goback, .comment_goback, .player_goback {
    &::before {
      content: "";
      position: absolute;
      width: 7px;
      height: 7px;
      border: solid $color;
      border-width: 3px 0 0 3px;
      transform: rotate(315deg);
      top: 7px;
      left: 0;
    }
    h2 {
      font-weight: bolder;
      font-size: 15px;
      line-height: 26px;
    }
  }
  // 详情组件当中的goback
  .detail_goback {
    @include goBack(relative, inherit, inherit);
  }
  // 评论组件当中的goback
  .comment_goback {
    @include goBack(absolute, 3vw, 3vw);
    z-index: 200;
  }
  // 播放器当中的goback
  .player_goback {
    @include goBack(absolute, 3vw, 3vw);
    cursor: pointer;
    z-index: 100;
  }
</style>
