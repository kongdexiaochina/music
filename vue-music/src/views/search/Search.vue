<template>
  <div class="search">
    <search-control />
    <search-hot-list :hotList="hotList"/>
  </div>
</template>

<script>
// 引入对应的API数据请求接口
import { hotListData } from '../../api/search'
// 引入当前组件下面的子组件
import SearchControl from './base/Control'
import SearchHotList from './base/HotList'
export default {
  name: 'Search',
  data () {
    return {
      hotList: []// 热搜列表数据
    }
  },
  // 请求数据
  created () {
    this.getHotListData()
  },
  methods: {
    // 请求数据的函数
    async getHotListData () {
      const { result: { hots } } = await hotListData()
      this.hotList = hots
    }
  },
  components: {
    SearchControl,
    SearchHotList
  }
}
</script>

<style scoped lang="scss">
  .search {
    padding-top: 108px;
  }
</style>
