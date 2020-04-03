import request from './request'
// 引入整合歌曲列表的整合函数
import { ConformityDetailData } from '../utils/conformitydata'
// 请求歌单详情数据
export const DetailSong = id => request(`/playlist/detail?id=${id}`)

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
export function DetailSongList (list) {
  // this.list = newArr
  this.list = ConformityDetailData(list)
}
