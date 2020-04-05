import Vue from 'vue'
import Vuex from 'vuex'
// 引入动作函数
import { playerChange, openPlayer, isMusic, speedTime, speedDuration, getPathName } from './actionsType'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 其他模块组件需要传递到player播放器组件的数据
    playerArr: [],
    // 是否开启音乐 （组件加载的时候）
    isOpen: false,
    // 音频的播放实时的时间（点击开始或者是关闭音乐按钮的时候）
    time: 0,
    duration: 1, // 获取视频的总播放时间
    pathname: '/' // pathname 的值
  },
  mutations: {
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
    // 获取pathname的值
    [getPathName] (state, pathname) {
      state.pathname = pathname
      console.log(state.pathname)
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  }
})
