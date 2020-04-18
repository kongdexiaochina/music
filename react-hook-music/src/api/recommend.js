import request from "./request";

// 推荐歌单数据 num 表示要请求几个歌单的数据
export const SongListData = num =>  request(`/personalized?limit=${num}`)
// 最新音乐数据
export const NewMusicData = () => request('/personalized/newsong')
