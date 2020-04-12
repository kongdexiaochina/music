// 引入对应的动作
import {MusicData, MusicObj, ISMusic, IsSmallPlayer, getLyricArr, ActivateIndex} from './actionType'

export default function (state = {
    music_data: [], // 所有歌曲的数据
    music_obj:  JSON.parse(localStorage.getItem("musicObj")) || {}, // 当前播放音乐的数据
    is_Music: true, // 是否开启音乐 true表示关闭音乐
    is_small_music: true, // 是否迷你音乐播放器
    lyric: [], // 当前播放歌曲的歌词
    activate_index: 0 // 获取激活歌词状态下面的索引值
}, action) {
    switch (action.type) {
        // 获取所有数据的动作
        case MusicData:
            return {
                ...state,
                music_data: action.data
            }
         // 获取当前播放音乐的数据
        case MusicObj:
            localStorage.setItem("musicObj", JSON.stringify(action.obj))
            return {
                ...state,
                music_obj: action.obj
            }
        // 是否开启音乐
        case ISMusic:
            return {
                ...state,
                is_Music: action.bol
            }
        // 是否显示迷你播放器
        case IsSmallPlayer:
            return {
                ...state,
                is_small_music: action.bol
            }
        // 获取当前播放音乐的歌词
        case getLyricArr :
            return {
                ...state,
                lyric: JSON.parse(JSON.stringify(action.arr))
            }
        // 获取到当前播放歌词当中的激活状态的索引值
        case ActivateIndex :
            return {
                ...state,
                activate_index: action.index
            }
        default: {
            return state
        }
    }
}
