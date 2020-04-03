<template>
    <footer class="footer">
      <div class="content">
        <div class="logo">
          <img src="../../../assets/images/foot.svg" alt="logo">
        </div>
      </div>
    </footer>
</template>

<script>
export default {
  name: 'Foot'
}
</script>

<style scoped lang="scss">
  .footer {
    position: relative;
    height: 220px;
    margin-top: 4px;
    background: url('../../../assets/images/footbg.png') no-repeat;
    background-size: contain;
    .content {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 1;
      text-align: center;
      .logo {
        padding-top: 12%;
        img {
          display: block;
          margin: 0 auto;
          width: 230px;
          height: 44px;
        }
      }
    }
  }
</style>
