import request from './request'
// 请求热歌榜的数据 num表示请求热歌榜的类型
export const hotSongData = num => request(`/top/list?idx=${num}`)
