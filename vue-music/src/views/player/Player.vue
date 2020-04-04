<template>
    <div class="player">
      <div class="player_bgc" :style="{backgroundImage:`url(${playerObj.picUrl})`}"></div>
      <div class="wrapper">
        <common-go-back :className="'player_goback'"/>
        <player-icon :urlImg="playerObj.picUrl" :id="playerObj.id"/>
        <player-song-text :title="playerObj.name" :artists="playerObj.artists" :id="playerObj.id"/>
        <div class="link_comment" @click="handleClick(playerObj.id)">查看歌曲评论</div>
      </div>
    </div>
</template>

<script>
// 引入对应的vuex辅助函数
import { mapState, mapMutations } from 'vuex'
// 引用对应的vuex同步方法的动作
import { openPlayer } from '../../store/actionsType'
// 引入适用性比较高的组件
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
    ...mapState(['playerArr']),
    playerObj () {
      const index = this.$route.params.index
      // 判断加载的时候是不是数组为空 如果不是空那么就返回我们整合好的数据
      if (this.playerArr.length !== 0) {
        const obj = this.playerArr[index]
        if (obj) {
          console.log(obj)
          const objData = {
            id: obj.id,
            picUrl: obj.picUrl,
            name: obj.name,
            artists: obj.song.artists
          }
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
    ...mapMutations([openPlayer]),
    handleClick (id) {
      this.$router.push({
        path: '/comment',
        query: {
          id
        }
      })
    }
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
