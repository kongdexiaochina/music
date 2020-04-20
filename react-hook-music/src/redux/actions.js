// 引入对应的actionsType
import {itemPlayerData, isMusic, isPlay} from './actionsType'

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
