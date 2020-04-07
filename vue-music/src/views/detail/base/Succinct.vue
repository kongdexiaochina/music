<template functional>
    <div class="succinct">
      <nav class="succinct_tags">
        标签:
        <em v-for="(tag, index) in props.succinct.tags" :key="index" class="tag">{{tag}}</em>
      </nav>
      <div class="text">
        <span>
          简介:
          {{props.succinct.description.substring(0, 100)}}
          <span v-if="props.succinct.description.length > 100">......</span>
        </span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Succinct',
  // props教验传递过来的数据
  props: {
    succinct: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .succinct {
    position: relative;
    margin: 0 10px 0 15px;
    padding-top: 10px;
    line-height: 19px;
    color: #666;
    .succinct_tags {
      margin-bottom: 10px;
      line-height: 20px;
      margin-right: -10px;
      .tag {
        display: inline-block;
        position: relative;
        margin-right: 10px;
        padding: 1px 8px;
        font-size: 12px;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 50%;
        font-style: normal;
      }
    }
    .text {
      position: relative;
      padding-bottom: 18px;
      line-height: 19px;
      color: #666;
      span {
        word-wrap: break-word;
        word-break: break-all;
        white-space: normal;
      }
    }
  }
</style>
