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
    // 使用编导式导航跳转到recommend组件模块部分
    handleClick () {
      this.$router.push(this.pathname).catch(e => {})
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
  .detail_goback, .comment_goback, .player_goback {
    &::before {
      content: "";
      position: absolute;
      width: 7px;
      height: 7px;
      border: solid #fff;
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
    position: relative;
    color: #fff;
    padding-left: 13px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  // 评论组件当中的goback
  .comment_goback {
    position: absolute;
    top: 3vw;
    left: 3vw;
    color: #fff;
    padding-left: 13px;
    margin-bottom: 10px;
    cursor: pointer;
    z-index: 200;
  }
  // 播放器当中的goback
  .player_goback {
    position: absolute;
    top: 3vw;
    left: 3vw;
    color: #fff;
    padding-left: 13px;
    margin-bottom: 10px;
    cursor: pointer;
  }
</style>
