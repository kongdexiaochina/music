<template>
<!--  本地存储里面没有我们当前要播放的音乐那么我们就让当前的播放器组件不显示-->
  <div class="small_player" v-if="Object.keys(musicData).length">
    <div class="play_icon"
         @click="handleClick"
         :style="{backgroundPosition: isOpen ? '0 -165px' : '0 -204px'}"
    ></div>
    <router-link :to="{name: 'Player', params: {bol: true}}" tag="div"  class="musicInfo">
      <img :src="musicData.picUrl" alt="歌曲图片">
      <p>
        <span>{{musicData.name}}</span>
        -
        <span v-for="(item, index) in musicData.artists" :key="index">
          <em v-if="index === 0 || index === 1">{{item.name}} </em>
        </span>
      </p>
      <div class="process">
        <div class="bar">
          <div class="on" :style="{width}"></div>
        </div>
      </div>
    </router-link>
    <keep-alive>
      <common-frequency :id="musicData.id" ref="minus"/>
    </keep-alive>
  </div>
</template>

<script>
// 引入适用性比较高的组件
import CommonFrequency from './Frequency'
// 引入对应的vuex辅助函数和对应的动作
import { mapState, mapMutations } from 'vuex'
import { openPlayer, isMusic } from '../../store/actionsType'
export default {
  name: 'SmallPlayer',
  mounted () {
    const minus = this.$refs.minus
    this.$nextTick(() => {
      if (minus) {
        const promise = minus.$el.play()
        promise.then(() => {
          if (this.isOpen) { // 开始播放
            this.openPlayer(true)
            minus.$el.play()
          } else { // 不开始播放
            this.openPlayer(false)
            minus.$el.pause()
          }
        }).catch(() => {})
      }
    })
  },
  methods: {
    // 把vuex当中的mutations同步方法映射成methods当中的方法
    ...mapMutations([openPlayer, isMusic]),
    // 点击切换歌曲的播放状态
    handleClick () {
      const minus = this.$refs.minus
      this.$nextTick(() => {
        if (!this.isOpen) { // 播放
          this.isMusic(true)
          minus.$el.play()
        } else { // 不播放
          this.isMusic(false)
          minus.$el.pause()
        }
      })
    }
  },
  // 把vuex当中的state映射成当前组件当中的computed
  computed: {
    ...mapState(['isOpen', 'time', 'duration', 'musicData']),
    width () {
      return (this.time / this.duration) * 100 + '%'
    }
  },
  components: {
    CommonFrequency
  }
}
</script>

<style scoped lang="scss">
@mixin positionType($type) {
  position: $type;
}
.small_player {
  @include positionType(fixed);
  bottom: -5px;
  left: 0;
  z-index: 99;
  height: 53px;
  width: 100vw;
  background: url('../../assets/images/playbar.png') repeat-x;
  .play_icon {
    @include positionType(absolute);
    left: 4%;
    top: 2vw;
    width: 36px;
    height: 36px;
    background: url('../../assets/images/playbar.png') no-repeat;
    background-position: 0 -204px;
  }
  .musicInfo {
    @include positionType(relative);
    max-width: 80%;
    margin-left: 18%;
    img {
      @include positionType(absolute);
      width: 13vw;
      height: 13vw;
      top: -3vw;
      left: 0;
    }
    p {
      @include positionType(absolute);
      left: 15vw;
      top: 2vw;
      color: #e8e8e8;
      font-size: 0.8rem;
      height: 5vw;
      overflow: hidden;
    }
    .process {
      @include positionType(absolute);
      top: 8vw;
      left: 15vw;
      width: 60vw;
      .bar {
        width: 100%;
        height: 3px;
        background-color: #EBEBEB;
        .on {
          height: 100%;
          background: #d43c33;
        }
      }
    }
  }
}
</style>
