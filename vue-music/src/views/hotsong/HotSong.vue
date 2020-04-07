<template>
  <div class="hotsong">
    <common-my-scroll :className="'hotsong_wrapper'" v-if="tracks.length">
      <template #content>
        <hot-song-banner :description="description"/>
        <hot-song-list :tracks="tracks"/>
      </template>
    </common-my-scroll>
    <content-loading v-else/>
  </div>
</template>

<script>
// 引入对应的API接口请求函数
import { hotSongData } from '../../api/hotsong'
// 引入工具类函数用于整合数据
import { ConformityDetailData } from '../../utils/conformitydata'
// 引入适用性比较搞的组件
import CommonMyScroll from '../../components/common/MyScroll'
// 引入适用性不是很高的组件
import ContentLoading from '../../components/content/Loading'
// 引入当前模块下面的子组件
import HotSongBanner from './base/Banner'
import HotSongList from './base/List'
export default {
  name: 'HotSong',
  data () {
    return {
      description: '', // 标题
      tracks: [] // 热歌榜列表数据
    }
  },
  // 请求对应的数据
  created () {
    this.getHotSongData()
  },
  activated () {
    this.getHotSongData()
  },
  methods: {
    // 请求数据的函数方法
    async getHotSongData () {
      const { playlist: { description, tracks } } = await hotSongData(1)
      this.description = description
      tracks.length = 25 // 显示数组的长度
      this.tracks = ConformityDetailData(tracks)
    }
  },
  components: {
    CommonMyScroll,
    ContentLoading,
    HotSongBanner,
    HotSongList
  }
}
</script>

<style scoped lang="scss">
  .hotsong {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
</style>
