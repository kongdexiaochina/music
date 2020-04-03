<template>
    <div class="recommend">
      <!-- 把需要滚动的内容插入到MyScroll组件当中 -->
      <comment-my-scroll :className="'recommend_wrapper'">
        <template #content>
          <h2 class="title">推荐歌单</h2>
          <recommend-list :list="list"/>
          <h2 class="title">最新音乐</h2>
          <recommend-new-music :newmusic="newmusic"/>
          <recommend-foot />
        </template>
      </comment-my-scroll>
    </div>
</template>

<script>
// 引入对应的API接口请求函数 recommendNewMusic
import { recommendListData, recommendNewMusic } from '../../api/recommend'
// 引入适用性比较高的组件
import CommentMyScroll from '../../components/common/MyScroll'
// 引入当中模块下面的子组件
import RecommendList from './base/List'
import RecommendNewMusic from './base/NewMusic'
import RecommendFoot from './base/Foot'

export default {
  name: 'Recommend',
  data () {
    return {
      // 推荐列表数据
      list: [],
      // 最新音乐数据
      newmusic: []
    }
  },
  // 请求对应的数据
  created () {
    this.getRecommendListData()
  },
  methods: {
    // 请求数据的函数
    async getRecommendListData () {
      const list = await recommendListData(6) // 6表示请求几条推荐歌单的数据
      const newmusic = await recommendNewMusic()
      this.list = list.result
      this.newmusic = newmusic.result
    }
  },
  components: {
    CommentMyScroll,
    RecommendList,
    RecommendNewMusic,
    RecommendFoot
  }
}
</script>

<style scoped lang="scss">
  .recommend {
    padding-top: 127px;
    .title {
      display: block;
      position: relative;
      padding-left: 9px;
      margin-bottom: 14px;
      font-size: 17px;
      font-weight: 400;
      height: 20px;
      line-height: 20px;
      &::after {
        content: " ";
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -9px;
        width: 2px;
        height: 16px;
        background-color: #d33a31;
      }
    }
  }
</style>
