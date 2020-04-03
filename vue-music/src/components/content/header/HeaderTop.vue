<template>
    <div class="header_top">
      <img src="../../../assets/images/logo.svg" alt="log">
      <div class="hint">Vue.js</div>
    </div>
</template>

<script>
export default {
  name: 'HeaderTop'
}
</script>

<style scoped lang="scss">
  .header_top {
    display: flex;
    padding: 0 20px;
    width: 100%;
    height: 64px;
    background-color: #d43c33;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    img {
      width: 142px;
      height: 25px;
      overflow: hidden;
    }
    .hint {
      position: relative;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      color: #fff;
      font-size: 15px;
      border: 1px solid white;
      border-radius: 37.5%/100%;
      cursor: pointer;
    }
  }
</style>
