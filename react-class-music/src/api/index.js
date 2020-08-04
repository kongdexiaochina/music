import axios from 'axios'

// 设置请求代理路径
axios.defaults.baseURL = 'http://localhost:3000'

// 获取轮播图数据的接口请求函数
export const getBanner = (type = 1) => axios.get(`/banner?type=${type}`)
// 获取推荐歌单数据的接口请求函数
export const getRecommendSong = (limit = 8) => axios.get(`/personalized?limit=${limit}`)
// 获取歌单数据的接口请求函数
export const getSong = (cat = '华语', order = 'hot', limit = 39) => axios.get(`/top/playlist?cat=${cat}&limit=${limit}&order=${order}`)
// 获取歌单详情的接口请求函数
export const getSongDetails = id => axios.get(`/playlist/detail?id=${id}`)
