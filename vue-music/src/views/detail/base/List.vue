<template>
    <div class="list" v-if="list.length">
      <h3 class="title">歌曲列表</h3>
      <ul class="title_song">
        <router-link :to="{name: 'Player', params: {index: index, bol: true}}" tag="li" class="title_song_item" v-for="(item, index) in list" :key="index">
          <!-- 我们使用SongListItem组件显示歌曲的内容 并且插入一些不同的结构 -->
          <common-song-list-item :item="item">
            <template #num>
              <div class="num">
                <span>{{index + 1}}</span>
              </div>
            </template>
            <template #modifier> - </template>
          </common-song-list-item>
        </router-link>
      </ul>
    </div>
</template>

<script>
// 引入适用性比较高的组件
import CommonSongListItem from '../../../components/common/SongListItem'
// 引入对应的vuex辅助函数
import { mapMutations } from 'vuex'
// 引用对应的vuex同步方法的动作
import { playerChange } from '../../../store/actionsType'
export default {
  name: 'List',
  methods: {
    // 把vuex里面的同步动作映射成methods当中的方法
    ...mapMutations([playerChange])
  },
  // 挂载完成之前访问现有DOM 的时候进行向vuex当中发送数据
  beforeUpdate () {
    this.playerChange(this.list)
  },
  // props教验传递过来的数据
  props: {
    list: {
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
  .title {
    height: 23px;
    line-height: 23px;
    padding: 0 10px;
    font-size: 14px;
    color: #666;
    background-color: #eeeff0;
    font-weight: bolder;
  }
  .title_song {
    width: 100%;
    height: 100%;
    padding-bottom: 85px;
    .title_song_item {
      display: flex;
      padding-left: 10px;
      .num {
        color: #999;
        align-items: center;
        width: 28px;
        font-size: 17px;
        display: flex;
      }
    }
  }
</style>
