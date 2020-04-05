<template>
    <div class="songtext">
      <h3>
        {{title}} ---
        <span v-for="(item, index) in artists" :key="index">
          <em v-if="index < 2">
            {{item.name}}
          </em>
        </span>
      </h3>
      <common-my-scroll :className="'text_wrapper'" ref="scroll">
        <template #content>
          <p class="item" :class="{on: index === activeIndex}" v-for="(item, index) in lyric" :key="index" ref="item">{{item.content}}</p>
        </template>
      </common-my-scroll>
    </div>
</template>

<script>
// 引入对应的API请求接口
import { playerLyricData } from '../../../api/player'
// 引入对应的工具类函数，用于处理我们歌词的数据
import lyricParser from '../../../utils/lyric'
// 引入对应的vuex辅助函数
import { mapState } from 'vuex'
// 引用适用性比较高的组件
import CommonMyScroll from '../../../components/common/MyScroll'
export default {
  name: 'SongText',
  data () {
    return {
      lyric: [] // 歌词数据
    }
  },
  // 获取数据
  created () {
    this.getPlayerLyricData()
  },
  methods: {
    // 获取歌词数据的函数
    async getPlayerLyricData () {
      const { lrc: { lyric } } = await playerLyricData(this.id)
      this.lyric = lyricParser(lyric)
    }
  },
  computed: {
    // 计算出当前列表滚动的index值
    activeIndex () {
      return this.lyric.findIndex((item, index, array) => {
        const nextLyric = array[index + 1]
        if (
          item.time <= this.time &&
          (nextLyric ? this.time < nextLyric.time : true)
        ) {
          return index
        }
      })
    },
    ...mapState(['time'])
  },
  watch: {
    // 使用watch实时监测activeIndex计算性属性的变化 并且滚动到对应的值
    activeIndex (newIndex) {
      try {
        this.$refs.scroll.scroll.scrollToElement(this.$refs.item[newIndex], 200, 0, true)
      } catch (e) {}
    }
  },
  // props教验传递过来的数据
  props: {
    title: {
      type: String,
      default: ''
    },
    artists: {
      type: Array,
      default () {
        return []
      }
    },
    id: {
      type: Number,
      default: 33894312
    }
  },
  components: {
    CommonMyScroll
  }
}
</script>

<style scoped lang="scss">
  .songtext {
    margin-top: 25px;
    padding: 0 35px;
    h3 {
      text-align: center;
      font-size: 18px;
      line-height: 1.1;
      color: #fefefe;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .item {
      padding-bottom: 8px;
    }
    .on {
      color: #eb1206;
      font-weight: 600;
      font-size: 18px;
    }
  }
</style>
