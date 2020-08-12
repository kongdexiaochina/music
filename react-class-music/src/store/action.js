import {
    IDLOGIN,
    GETMENUSIDATA,
    GETISPLAY,
    GETPROGRESS,
    GETCURRENTTIME,
    GETDURATION,
    GETPLARYSTATUS,
    GETPLARYLRYIC,
    GETLYLRYICINDEX,
    GETPLARYELIST,
    GETPLAYERINDEX,
    GETMODENUM,
    GETTHEMENAME
} from './action-type'

// 暴露是否已经登陆
export const getIsLogin = (obj = {}) => ({
    type:IDLOGIN,
    data:obj
})

// 暴露获取音乐播放器数据
export const getMenusData = (obj = {}) => ({
    type: GETMENUSIDATA,
    data: obj
})

// 暴露获取当前音乐是否播放
export const getIsPlay = (bol = false) => ({
    type: GETISPLAY,
    data: bol
})

// 暴露获取当前播放音乐的进度
export const getProgress = (progress = '0%') => ({
    type: GETPROGRESS,
    data: progress
})

// 暴露获取当前音乐播放的时间
export const getCurrentTime = (currentTime = 0) => ({
    type: GETCURRENTTIME,
    data: currentTime
})

// 暴露获取当前音乐的总时间
export const getDuration = (duration = 0) => ({
    type: GETDURATION,
    data: duration
})

// 暴露获取当前播放音乐的状态
export const getPlayStatus = (bol = false) => ({
    type: GETPLARYSTATUS,
    data: bol
})

// 暴露获取播放歌词数据的状态
export const getPlayLyric = (arr = []) => ({
    type: GETPLARYLRYIC,
    data: arr
})

// 暴露获取当前歌词正在播放的索引值
export const getActivateIndex = (index = 0) => ({
    type: GETLYLRYICINDEX,
    data: index
})

// 暴露获取当前播放列表的数据
export const getPlayerList = (arr = []) => ({
    type: GETPLARYELIST,
    data: arr
})

// 暴露获取当前播放列表的索引值的数据
export const getPlayerIndex = (index = 0) => ({
    type: GETPLAYERINDEX,
    data: index
})

// 暴露获取当前模式播放数值的数据
export const getModeNum = (num = 0) => ({
    type: GETMODENUM,
    data: num
})

// 暴露获取当前切换主题名称的数据
export const getThemeName = (name = 'red') => ({
    type: GETTHEMENAME,
    data: name
})
