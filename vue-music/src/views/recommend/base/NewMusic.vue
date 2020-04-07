<template>
    <ul class="newmusic_list">
      <router-link
        :to="{name: 'Player', params: {index: index, bol: true}}"
        tag="li" class="item"
        v-for="(item, index) in newmusic"
        :key="index"
      >
        <!-- 我们使用SongListItem组件显示歌曲的内容 并且插入一些不同的结构 -->
        <common-song-list-item :item="item">
          <template #num></template>
          <template #modifier> / </template>
        </common-song-list-item>
      </router-link>
    </ul>
</template>

<script>
// 引入对应的动作
import { playerChange } from '../../../store/actionsType'
// 引入对应的vuex辅助函数
import { mapMutations } from 'vuex'
// 引入适用性比较高的组件
import CommonSongListItem from '../../../components/common/SongListItem'
export default {
  name: 'NewMusic',
  mounted () {
    this.playerChange(this.newmusic)
  },
  methods: {
    // 把vuex里面的同步动作映射成methods当中的方法
    ...mapMutations([playerChange])
  },
  // 挂载完成之前访问现有DOM 的时候进行向vuex当中发送数据
  beforeUpdate () {
    this.playerChange(this.newmusic)
  },
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
