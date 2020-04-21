import request from './request'

// 评论组件数据
export const CommentData = id =>  request(`/comment/music?id=${id}&limit=1`)
