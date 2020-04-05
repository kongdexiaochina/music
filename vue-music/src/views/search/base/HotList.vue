<template>
    <div class="hotlist">
      <h3>热门搜索</h3>
      <ul class="list">
        <li v-for="(item, index) in hotList" :key="index">
          <span>{{item.first}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'HotList',
  // props教验传递过来的数据
  props: {
    hotList: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .hotlist {
    padding: 15px 10px 0;
    text-align: left;
    h3 {
      font-size: 12px;
      line-height: 12px;
      color: #666;
      font-weight: bolder;
    }
    .list {
      margin: 10px 0 7px;
      li {
        position: relative;
        display: inline-block;
        height: 32px;
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 0 14px;
        font-size: 14px;
        line-height: 32px;
        color: #333;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 37.5%/100%;
        cursor: pointer;
      }
    }
  }
</style>
