import request from './request'

// 请求歌单详情数据
export const DetailSongData = id => request(`/playlist/detail?id=${id}`)

// 整合歌单详情头部数据
export function DetailSongHeadData (urlImg, name) {
    this.urlImg = urlImg
    this.name = name
}

// 整合歌单简绍数据
export function DetailSuccinctData (tags, description) {
    this.tags = tags
    this.description = description
}

// 整合歌单中歌曲的数据
export function DetailSongListData (list) {
    this.list = list
}
