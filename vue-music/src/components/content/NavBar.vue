<template>
  <nav class="nav">
    <ul class="list">
      <router-link to="/recommend" tag="li" class="item">推荐音乐</router-link>
      <router-link to="/hotsong" tag="li" class="item">热歌榜</router-link>
      <router-link to="/search" tag="li" class="item">搜索</router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped lang="scss">
  .nav {
    position: relative;
    height: 44px;
    display: flex;
    background-color: #fff;
    height: 44px;
    .list {
      display: flex;
      width: 100%;
      height: 100%;
      .item {
        display: block;
        flex: 1;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-size: 15px;
        text-align: center;
        line-height: 44px;
        color: #666;
      }
      .router-link-exact-active{
        color: rgb(212, 60, 51);
        border-bottom:3px solid rgb(212, 60, 51);
      }
    }
  }
</style>
