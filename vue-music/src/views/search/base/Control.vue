<template>
  <div class="control">
    <img src="../../../assets/images/find.svg" alt="搜索">
    <div class="box">
      <input type="text" placeholder="搜索歌曲、歌手、专辑">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Control'
}
</script>

<style scoped lang="scss">
  .control {
    position: relative;
    background: #fbfcfd;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0 10px;
    img {
      position: absolute;
      left: 11px;
      top: 24px;
      margin: 0 8px;
      vertical-align: middle;
      display: inline-block;
      width: 13px;
      height: 13px;
      z-index: 99;
    }
    .box {
      position: relative;
      flex: 1;
      background: #ebecec;
      border-radius: 30px;
      padding: 0 30px;
      height: 30px;
      width: 100%;
      overflow: hidden;
      input {
        width: 100%;
        height: 100%;
        line-height: 100%;
        border: 0;
        outline: 0;
        -webkit-appearance: none;
        background-color: transparent;
        font-size: inherit;
        color: inherit;
      }
    }
  }
</style>
