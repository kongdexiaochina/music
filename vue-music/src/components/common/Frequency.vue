<template>
  <audio :src="url"
         loop
         :autoplay="isOpen"
         @timeupdate="handleTimeupdate"
         @play="play"
         ref="audioDom"></audio>
</template>

<script>
// 引入对应的API接口请求函数
import { playerSong } from '../../api/player'
// 引入对应的Vuex辅助函数
import { mapState, mapMutations } from 'vuex'
// 引入对应的动作
import { speedTime, speedDuration } from '../../store/actionsType'
export default {
  name: 'Frequency',
  data () {
    return {
      url: '' // 音频的URL路径
    }
  },
  // 请求数据
  created () {
    this.getPlayerSong()
  },
  activated () {
    this.getPlayerSong()
  },
  // 我们首先加载的时候用autoplay属性动态绑定来完成
  // 但是我们发现不能实时更新，那么我就在beforeUpDate
  // 生命周期函数里面直接回去音频DOM并且是否播让他播放
  beforeUpdate () {
    this.minusPlay()
  },
  watch: {
    id () {
      console.log('监听到了id', this.id)
      this.getPlayerSong()
    }
  },
  methods: {
    // 请求数据的函数
    async getPlayerSong () {
      const { data } = await playerSong(this.id)
      this.url = data[0].url
    },
    minusPlay () {
      const promise = this.$refs.audioDom.play()
      // paly执行返回结果是一个promise那么我们可以用then 和 catch的方式解决报错问题
      promise.then(() => {
        if (this.isOpen) {
          this.$refs.audioDom.play()
        } else {
          this.$refs.audioDom.pause()
        }
      }).catch(() => {})
    },
    // 我们检测音频的播放变化
    handleTimeupdate () {
      try {
        this.speedTime(this.$refs.audioDom.currentTime)
      } catch (e) {}
    },
    // 当音频可以播放的时候 我们向vuex发射当前音频的duration属性并且是异步发送
    play () {
      this.$nextTick(() => {
        this.speedDuration(this.$refs.audioDom.duration)
        localStorage.setItem('id', this.id)
      })
    },
    ...mapMutations([speedTime, speedDuration])
  },
  computed: {
    // 我们把vuex当中的state数据映射成computed的计算性属性
    ...mapState(['isOpen'])
  },
  beforeDestroy () {
    this.speedDuration(this.$refs.audioDom.duration)
    this.$refs.audioDom.pause()
  },
  // props教验传递过来的数据
  props: {
    id: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">

</style>
