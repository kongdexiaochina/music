<template>
    <ul v-if="Object.keys(newmusic.length)" class="newmusic_list">
      <li class="item" v-for="(item, index) in newmusic" :key="index">
        <!-- 我们使用SongListItem组件显示歌曲的内容 并且插入一些不同的结构 -->
        <common-song-list-item :item="item">
          <template #num></template>
          <template #modifier> / </template>
        </common-song-list-item>
      </li>
    </ul>
</template>

<script>
// 引入适用性比较高的组件
import CommonSongListItem from '../../../components/common/SongListItem'
export default {
  name: 'NewMusic',
  // props教验传递过来的数据
  props: {
    newmusic: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    CommonSongListItem
  }
}
</script>

<style scoped lang="scss">
  .newmusic_list {
    .item {
      display: flex;
      padding-left: 10px;
    }
  }
</style>
