<template>
  <div class="getBack" @click="handleClick">
    <h2>返回</h2>
  </div>
</template>

<script>
export default {
  name: 'GoBack',
  methods: {
    // 使用编导式导航跳转到recommend组件模块部分
    handleClick () {
      this.$router.push(this.pathStr).catch(e => {})
    }
  },
  // props教验传递过来的数据
  props: {
    pathStr: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style scoped lang="scss">
  .getBack {
    position: relative;
    color: #fff;
    padding-left: 13px;
    margin-bottom: 10px;
    cursor: pointer;
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
</style>
