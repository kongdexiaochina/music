<template>
    <div class="hotlist">
      <h3 v-if="isShow">热门搜索</h3>
      <ul class="list" v-if="isShow">
        <li v-for="(item, index) in hotList" :key="index" @click="handleClick(item.first)">
          <span>{{item.first}}</span>
        </li>
      </ul>
      <section v-else>
        <h3 v-if="!songsList.length">暂无搜索数据</h3>
        <common-my-scroll :className="'hotlist_wrapper'">
          <template #content>
            <ul>
              <router-link
                :to="{name: 'Player', params: {index: index, bol: true}}"
                tag="li"
                v-for="(item, index) in songsList" :key="index">
                <common-song-list-item :item="item">
                  <template #num></template>
                  <template #modifier> / </template>
                </common-song-list-item>
              </router-link>
            </ul>
          </template>
        </common-my-scroll>
      </section>
    </div>
</template>

<script>
// 引入对应的vuex辅助函数
import { mapMutations } from 'vuex'
// 引用对应的vuex同步方法的动作
import { playerChange } from '../../../store/actionsType'
// 引入适用性比较高的组件
import CommonSongListItem from '../../../components/common/SongListItem'
import CommonMyScroll from '../../../components/common/MyScroll'
export default {
  name: 'HotList',
  methods: {
    // 向父级发射一个事件 并且传递一个name值
    handleClick (name) {
      this.$emit('getListPlayer', name)
    },
    // 把vuex里面的同步动作映射成methods当中的方法
    ...mapMutations([playerChange])
  },
  computed: {
    // 判断是否是空格串
    isShow () {
      return !this.msg.replace(/(^\s*)|(\s*$)/g, '')
    }
  },
  // 挂载完成之前访问现有DOM 的时候进行向vuex当中发送数据
  beforeUpdate () {
    this.playerChange(this.songsList)
  },
  // props教验传递过来的数据
  props: {
    hotList: {
      type: Array,
      default () {
        return []
      }
    },
    songsList: {
      type: Array,
      default () {
        return []
      }
    },
    msg: {
      type: String,
      default: ''
    }
  },
  components: {
    CommonSongListItem,
    CommonMyScroll
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
