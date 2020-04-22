// 引入对应的actionsType
import {
    itemPlayerData,
    isMusic,
    isPlay,
    currentTimeDate,
    isPlayUrl
} from './actionsType'

export default function (state= {
    // 歌曲数据
    playerItemObj: JSON.parse(localStorage.getItem("itemPlayer")) || {},
    // 是否现在迷你播放器
    isMusic: true,
    // 是否播放默认是不 播放的
    isPlay: false,
    // 获取音频实时播放的时候
    currentTime: 0,
    // 是否获取到了歌曲的url路由
    isUrl: false
}, action) {
    switch  (action.type) {
        // 获取对应的歌曲
        case itemPlayerData :
            localStorage.setItem("itemPlayer", JSON.stringify(action.obj))
            return {
                ...state,
                playerItemObj: {...action.obj}
            }
        // 是否显示迷你播放器
        case isMusic:
            return {
                ...state,
                isMusic: action.bol
            }
        // 是否播放
        case isPlay:
            return {
                ...state,
                isPlay: action.bol
            }
         // 获取音频实时播放的currentTime值
        case currentTimeDate :
            return {
                ...state,
                currentTime: action.num
            }
        // 是否获取到了歌曲的URL路径
        case isPlayUrl :
            return {
                ...state,
                isUrl: action.bol
            }
        default :
            return {...state}
    }
}
