<template>
    <transition :name="name">
      <slot name="slide"></slot>
    </transition>
</template>

<script>
export default {
  name: 'SlideTranslate',
  // props教验传递出来的数据
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
  // 移动：向左移动自己的一个身位
  .left-leave-active { // 离开的过程中
    transform: translateX(0px);
    transition: 2s;
  }
  .left-leave-to { // 离开的最后一刻
    transform: translateX(-100%);
    transition: 2s;
  }
  // 进入
  .left-enter-active { // 进入的过程中
    transform: translateX(100%);
    transition: 2s;
  }
  .left-enter-to { // 进入的最后一刻
    transform: translateX(0px);
    transition: 2s;
  }
  // 离开
  .right-leave-active { // 离开的过程中
    transform: translateX(0px);
    transition: 2s;
  }
  .right-leave-to { // 离开的最后一刻
    transform: translateX(100%);
    transition: 2s;
  }
  // 进入
  .right-enter-active { // 进入的过程中
    transform: translateX(-100%);
    transition: 2s;
  }
  .right-enter-to { // 进入的最后一刻
    transform: translateX(0);
    transition: 2s;
  }
  // 缩放
  .scale-enter, .scale-leave-to {
    transform: scale(0);
    opacity: 0;
  }
  .scale-leave, .scale-enter-to {
    transform: scale(1);
    opacity: 1;
  }
  .scale-enter-active, .scale-leave-active {
    transition: all .2s;
  }
</style>
