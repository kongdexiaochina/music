import axios from 'axios'

// 设置请求代理路径
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true; //配置为true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; // 判断是否为ajax请求

// 获取轮播图数据的接口请求函数
export const getBanner = (type = 1) => axios.get(`/banner?type=${type}`)
// 获取推荐歌单数据的接口请求函数
export const getRecommendSong = (limit = 8) => axios.get(`/personalized?limit=${limit}`)
// 获取用户每日推荐歌曲数据的接口请求函数
export const getUserRecommend = () => axios.get('/recommend/songs')

// 获取歌单数据的接口请求函数
export const getSong = (cat = '华语', order = 'hot', limit = 39) => axios.get(`/top/playlist?cat=${cat}&limit=${limit}&order=${order}`)
// 获取歌单详情数据的接口请求函数
export const getSongDetails = id => axios.get(`/playlist/detail?id=${id}`)
// 获取热门歌单分类数据的接口请求函数
export const getSongHot = () => axios.get('/playlist/hot')
// 获取歌单(网友精选碟)的接口请求函数
export const getSongHandpick = (limit = 39, cat = '华语', order = 'hot') => axios.get(`/top/playlist?limit=${limit}&cat=${cat}&order=${order}`)

// 获取官方榜歌单数据的接口请求函数
export const getRankSong = () => axios.get('/toplist/detail')
// 获取电台轮播图数据的接口请求函数
export const getDjBanner = () => axios.get('/dj/banner')
// 获取电台推荐歌单数据的接口请求函数
export const getDjRecommend = () => axios.get('/dj/category/recommend')
// 获取电台节目榜列表数据的接口请求函数
export const getDjProgram = (limit = 30) => axios.get(`/dj/program/toplist/hours?limit=${limit}`)

// 获取搜索最火热歌曲数据接口请求函数
export const getSearchHot = () => axios.get(`/search/hot/detail`)
// 获取建议搜索数据接口请求函数
export const getSearchSuggest = (keywords,type='mobile') => axios.get(`/search/suggest?type=${type}&keywords=${keywords}`)
// 获取建议搜索详情列表数据的接口请求函数
export const getSearchDetailList = (keywords, limit = 15) => axios.get(`/search?keywords=${keywords}&limit=${limit}`)

// 请求登陆用户的接口请求函数
export const getLogin = (phone, password) => axios.get(`/login/cellphone?phone=${phone}&password=${password}`)
// 获取用户歌单的接口请求函数
export const getUserSong = id => axios.get(`/user/playlist?uid=${id}`)
// 获取用户登陆的状态接口请求函数
export const getLoginStatus = () => axios.get('/login/status')
// 获取用户关注列表数据的接口请求函数
export const getUserFollows = id => axios.get(`/user/follows?uid=${id}`)
// 退出用户的接口请求函数
export const getUserOut = () => axios.get('/logout')

// 获取视频标签类型的接口请求函数
export const getVideoTag = () => axios.get('/video/group/list')
// 获取视频分类的视频数据接口请求函数
export const getVideoTagData = id => axios.get(`/video/group?id=${id}`)
// 获取视频播放路径数据的接口请求函数
export const geiVideoSrc = id => axios.get(`/video/url?id=${id}`)
// 获取视频详情数据的接口请求函数
export const getVideoDetails = id => axios.get(`/video/detail?id=${id}`)
// 获取视频评论数据的接口请求函数
export const getVideoCommon = id => axios.get(`/comment/video?id=${id}`)

// 获取当前播放的歌曲是是否可以播放
export const getIsMenusPlay = id => axios.get(`/check/music?id=${id}`)
// 获取播放音乐的URL路径
export const getSongRUrl = id => axios.get(`/song/url?id=${id}`)
// 获取播放音乐歌词的接口请求函数
export const getSongLyric = id => axios.get(`/lyric?id=${id}`)
