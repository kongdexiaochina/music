// 引入对应的动作
import {MusicData, MusicObj, ISMusic, IsSmallPlayer, getLyricArr, ActivateIndex} from './actionType'

// 获取所有歌曲的数据
export const getMusicData = data => {
    return {
        type: MusicData,
        data
    }
}
// 获取当前需要播放歌曲的数据
export const getMusicObj = obj => {
    return {
        type: MusicObj,
        obj
    }
}
// 是否开启音乐
export const getIsMusic = bol => {
    return {
        type: ISMusic,
        bol
    }
}
// 显示迷你播放器音乐
export const getIsSmallMusic = bol => {
    return {
        type: IsSmallPlayer,
        bol
    }
}

// 获取当前播放音乐的歌词
export const getLyric = arr => {
    return {
        type: getLyricArr,
        arr
    }
}

// 显示激活状态下的歌词的索引值
export const getActivateIndex = index => {
    return {
        type: ActivateIndex,
        index
    }
}
