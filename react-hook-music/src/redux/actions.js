// 引入对应的actionsType
import {itemPlayerData, isMusic, isPlay, currentTimeDate} from './actionsType'

// 获取歌曲数据
export const getItemPlayer = obj => {
    return {
        type: itemPlayerData,
        obj
    }
}

// 是否现在迷你播放器
export const getIsMusic = bol => {
    return {
        type: isMusic,
        bol
    }
}

// 是否播放音乐
export const getIsPlay = bol => {
    return {
        type: isPlay,
        bol
    }
}

// 获取音频实时播放的时间
export const getCurrentTime = num => {
    return {
        type: currentTimeDate,
        num
    }
}
