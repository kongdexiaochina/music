<template>
    <div class="player">
      <div class="player_bgc" :style="{backgroundImage:`url(${playerObj.picUrl})`}"></div>
      <div class="wrapper">
        <common-go-back :className="'player_goback'"/>
        <player-icon :urlImg="playerObj.picUrl" :id="playerObj.id" ref="dom"/>
        <player-song-text :title="playerObj.name" :artists="playerObj.artists" :id="playerObj.id"/>
        <router-link :to="{path: '/comment', query: {id: playerObj.id}}" tag="div" class="link_comment">查看歌曲评论</router-link>
      </div>
    </div>
</template>

<script>
// 引入对应的vuex辅助函数
import { mapState, mapMutations } from 'vuex'
// 引用对应的vuex同步方法的动作
import { openPlayer, speedDuration, getMusicData } from '../../store/actionsType'
import CommonGoBack from '../../components/common/GoBack'
// 引入当中组件模块下面的子组件
import PlayerIcon from './base/Icon'
import PlayerSongText from './base/SongText'
export default {
  name: 'Player',
  // 到DOM挂载完毕的时候 我们让音乐播放
  mounted () {
    this.openPlayer(this.$route.params.bol)
  },
  computed: {
    // 把vuex当中的state数据映射在computed选项当中
    ...mapState(['playerArr', 'time']),
    playerObj () {
      const index = this.$route.params.index
      // 判断加载的时候是不是数组为空 如果不是空那么就返回我们整合好的数据
      if (this.playerArr.length !== 0) {
        const obj = this.playerArr[index]
        if (obj) {
          const objData = {
            id: obj.id,
            picUrl: obj.picUrl || obj.song.album.artists[0].img1v1Url || obj.song.name.picUrl,
            name: obj.name,
            artists: obj.song.album.artists || obj.song.artists
          }
          this.getMusicData(objData)
          localStorage.setItem('playerObj', JSON.stringify(objData))
          return objData
        }
      }
      // 反之就返回我们本地存储的数据，哈哈哈
      return JSON.parse(localStorage.getItem('playerObj'))
    }
  },
  methods: {
    // 我们把vuex当中的同步方法映射成当前组件当中的methods选项里面方法
    ...mapMutations([openPlayer, speedDuration, getMusicData])
  },
  components: {
    CommonGoBack,
    PlayerIcon,
    PlayerSongText
  }
}
</script>

<style scoped lang="scss">
  .player {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
    .player_bgc {
      background-color: #161824;
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      transform: scale(1.2);
      transform-origin: center;
      filter: blur(10px);
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      height: 100%;
      overflow: hidden;
      z-index: 1;
      animation: bgchange 50s linear infinite;
      &::before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
    .wrapper {
      z-index: 1;
      position: relative;
      width: 100vw;
      padding-top: 80px;
      box-sizing: border-box;
      .link_comment {
        position: fixed;
        left: 25%;
        bottom: 3vw;
        width: 50%;
        height: 30px;
        border: 1px solid #ff3a3a;
        border-radius: 40px;
        font-size: 16px;
        text-align: center;
        background: #ff3a3a;
        color: #fff;
        line-height: 30px;
      }
    }
  }
</style>
