<template>
  <div class="search">
    <search-control :msg="msg" @handleValue="handleValue" @handleKeyDown="handleKeyDown"/>
    <search-hot-list :hotList="hotList" :msg="msg" @getListPlayer="getListPlayer" :songsList="songsList"/>
  </div>
</template>

<script>
// 引入对应的API数据请求接口
import { hotListData, hotSearch } from '../../api/search'
import { ConformityDetailData } from '../../utils/conformitydata'
// 引入当前组件下面的子组件
import SearchControl from './base/Control'
import SearchHotList from './base/HotList'
export default {
  name: 'Search',
  data () {
    return {
      hotList: [], // 热搜列表数据
      msg: '', // 搜索框当中的数据
      songsList: [] // 热门搜索类表数据
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
    },
    async getHotSearch () {
      // 判断是否是空格串 如果是那么就不获取数据 反之获取数据
      if (this.msg.replace(/(^\s*)|(\s*$)/g, '')) {
        const { result: { songs } } = await hotSearch(this.msg)
        this.songsList = ConformityDetailData(songs)
      }
    },
    // 接受父级传递过来的getListPlayer事件 并且对data选项当中的属性赋值 并且获取数据
    getListPlayer (name) {
      this.msg = name
      this.getHotSearch()
    },
    // 实时获取子组件当中的value值
    handleValue (value) {
      this.msg = value
      this.getHotSearch()
    },
    // 当按下回车键的时候 获取数据
    handleKeyDown () {
      this.getHotSearch()
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
