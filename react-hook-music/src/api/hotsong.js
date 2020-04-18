import request from  './request'

// 热歌榜当中的数据 num 表示热歌榜请求的类型 如"1": 云音乐热歌榜,
export const BannerData = num => request(`/top/list?idx=${num}`)
