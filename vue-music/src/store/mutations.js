// 引入对应的动作
import {
  playerChange,
  openPlayer,
  isMusic,
  speedTime,
  speedDuration,
  getMusicData,
  getIsError
} from './actionsType'

export default {
  // 把传递出来的数据辅助到state当中
  [playerChange] (state, arr) {
    state.playerArr = arr
  },
  // 是否开启音乐（组件加载的时候）
  [openPlayer] (state, isBol) {
    if (isBol) {
      state.isOpen = true
    } else {
      state.isOpen = false
    }
  },
  // 是否开启音乐（点击按钮的时候）
  [isMusic] (state, bol) {
    state.isOpen = bol
  },
  // 获取播放速度
  [speedTime] (state, time) {
    if (time) {
      state.time = time
    }
  },
  // 获取音频的总播放时间
  [speedDuration] (state, time) {
    state.duration = time
  },
  // 获取迷你播放器的数据
  [getMusicData] (state, musicData) {
    state.musicData = musicData
  },
  // 是否加载出来音乐
  [getIsError] (state, bol) {
    state.isError = bol
  }
}
