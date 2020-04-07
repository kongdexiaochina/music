<template>
    <div class="banner">
      <div class="banner_flex">
        <div class="banner_icon"></div>
        <div class="banner_time">
          {{description}}
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Banner',
  // props教验传递过来的数据
  props: {
    description: {
      type: String,
      default: '更新日期：4月5日'
    }
  }
}
</script>

<style scoped lang="scss">
  @mixin position  {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .banner {
    position: relative;
    padding-top: 38.9%;
    overflow: hidden;
    background: url('../../../assets/images/hot_bg.jpg') no-repeat;
    background-size: contain;
    .banner_flex {
      @include position;
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 2;
      padding-left: 20px;
      box-sizing: border-box;
      .banner_icon {
        width: 142px;
        height: 67px;
        background-image: url('../../../assets/images/hot_icon.png');
        background-position: -24px -30px;
        background-size: 166px 97px;
      }
      .banner_time {
        text-align: left;
        margin-top: 10px;
        color: hsla(0, 0%, 100%, 0.8);
        font-size: 12px;
        transform: scale(0.91);
        transform-origin: left top;
      }
      &::after {
        content: " ";
        @include position;
        z-index: -10;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
</style>
