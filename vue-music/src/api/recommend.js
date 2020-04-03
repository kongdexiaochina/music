import request from './request'
// 推荐歌单
export const recommendListData = (num) => request(`/personalized?limit=${num}`)
// 最新音乐
export const recommendNewMusic = () => request('/personalized/newsong')
