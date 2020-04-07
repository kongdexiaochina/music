<template>
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
</template>

<style scoped lang="scss">
@mixin delay ($s) {
  animation-delay: $s;
}
@mixin plan ($top, $left) {
  top: $top;
  left: $left;
}
.lds-roller {
  display: inline-block;
  position: absolute;
  right: 0;
  bottom: 0;
  @include plan(0, 0);
  width: 80px;
  height: 80px;
  margin: auto;
  z-index: 100;
  div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }
  div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: pink;
    margin: -4px 0 0 -4px;
  }
  div:nth-child(1) {
    @include delay(-0.036s);
  }
  div:nth-child(1):after {
    @include plan(63px, 63px);
  }
  div:nth-child(2) {
    @include delay(-0.072s);
  }
  div:nth-child(2):after {
    @include plan(68px, 56px);
  }
  div:nth-child(3) {
    @include delay(-0.108s);
  }
  div:nth-child(3):after {
    @include plan(71px, 48px);
  }
  div:nth-child(4) {
    @include delay(-0.144s);
  }
  div:nth-child(4):after {
    @include plan(72px, 40px);
  }
  div:nth-child(5) {
    @include delay(-0.18s);
  }
  div:nth-child(5):after {
    @include plan(71px, 32px);
  }
  div:nth-child(6) {
    @include delay(-0.216s);
  }
  div:nth-child(6):after {
    @include plan(68px, 24px);
  }
  div:nth-child(7) {
    @include delay(-0.252s);
  }
  div:nth-child(7):after {
    @include plan(63px, 17px);
  }
  div:nth-child(8) {
    @include delay(-0.288s);
  }
  div:nth-child(8):after {
    @include plan(56px, 12px);
  }
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
