<template>
    <ul class="list">
      <router-link
        :to="{name: 'Player', params: {index: index, bol: true}}"
        tag="li"
        v-for="(item, index) in tracks" :key="index">
        <common-song-list-item :item="item">
          <template #num>
            <div class="num" :class="{on: index < 3}">{{handletoTwo(index + 1)}}</div>
          </template>
          <template #modifier>-</template>
        </common-song-list-item>
      </router-link>
    </ul>
</template>

<script>
// 引入适用性比较高的组件
import CommonSongListItem from '../../../components/common/SongListItem'
export default {
  name: 'List',
  computed: {
    handletoTwo () {
      return num => num < 10 ? '0' + num : num
    }
  },
  // props教验传递过来的数据
  props: {
    tracks: {
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
  .list {
    padding-bottom: 68px;
  }
  .num {
    color: #999;
    align-items: center;
    width: 28px;
    font-size: 17px;
    display: flex;
    padding-left: 10px;
  }
  .on {
    color: #df3436;
  }
</style>
