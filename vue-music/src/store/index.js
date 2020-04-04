import Vue from 'vue'
import Vuex from 'vuex'
// 引入动作函数
import { playerChange, openPlayer, isMusic, speedTime } from './actionsType'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 其他模块组件需要传递到player播放器组件的数据
    playerArr: [],
    // 是否开启引用
    isOpen: false,
    // 音频的播放实时的时间
    time: 0
  },
  mutations: {
    // 把传递出来的数据辅助到state当中
    [playerChange] (state, arr) {
      state.playerArr = arr
    },
    // 是否开启引用
    [openPlayer] (state, isBol) {
      if (isBol) {
        state.isOpen = true
      } else {
        state.isOpen = false
      }
    },
    // 是否开启音乐
    [isMusic] (state, bol) {
      state.isOpen = bol
      console.log(state.isOpen)
    },
    // 获取播放速度
    [speedTime] (state, time) {
      state.time = time
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  }
})
