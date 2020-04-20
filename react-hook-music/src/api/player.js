import request from './request'

// 获取对应歌曲的歌词
export const playerLyricData = id => request(`/lyric?id=${id}`)

// 获取歌曲的URL路径
export const playerSong = id => request(`/song/url?id=${id}`)
