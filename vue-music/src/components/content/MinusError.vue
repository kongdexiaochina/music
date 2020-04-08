<template functional>
  <div class="error">
    <h1>获取歌词失败</h1>
  </div>
</template>

<script>
export default {
  name: 'MinusError'
}
</script>

<style scoped>
  .error {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
    height: 55px;
    z-index: 100;
    box-sizing: border-box;
    animation-name: error;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;
  }
  @keyframes error {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .error::before {
    content: " ";
    display: block;
    position: absolute;
    top: -10px;
    left: 0;
    height: calc(100% + 10px);
    width: 100%;
    background-color: rgb(230, 230, 230);
    border: 2px dotted rgb(200, 200, 200);
    border-radius: 5px;
  }

  .error::after {
    content: "图片加载失败" attr(alt);
    text-align: center;
    line-height: 45px;
    display: block;
    font-size: 16px;
    font-style: normal;
    font-family: FontAwesome;
    color: rgb(100, 100, 100);

    position: absolute;
    top: 5px;
    left: 0;
    width: 100%;
    text-align: center;
  }
</style>
