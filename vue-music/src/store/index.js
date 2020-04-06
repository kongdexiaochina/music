import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
  // 其他模块组件需要传递到player播放器组件的数据
  playerArr: [],
  // 是否开启音乐 （组件加载的时候）
  isOpen: false,
  // 音频的播放实时的时间（点击开始或者是关闭音乐按钮的时候）
  time: 0,
  duration: 1 // 获取视频的总播放时间
}
export default new Vuex.Store({
  state,
  mutations
})
