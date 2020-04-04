import request from './request'

// 获取对应歌曲的歌词
export const playerLyricData = id => request(`/lyric?id=${id}`)

// 获取歌曲的URL路径
export const playerSong = id => request(`/song/url?id=${id}`)

// 获取歌曲评论 limit表示请求几条评论
export const playerComment = id => request(`/comment/music?id=${id}&limit=1`)
