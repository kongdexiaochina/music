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
    GETMODENUM
} from './action-type'
import localStorage from '../utility/localStorage'
const {getLocalStorage} = localStorage
export default function (store = {
    loginStatus: {}, // 用户登陆状态
    player: getLocalStorage('player') || {}, // 音乐播放器的数据
    isPlay: false, // 当前歌曲是否播放
    progress: '0%', // 当前歌曲的播放进度
    currentTime: 0, // 当前播放音乐的时间
    duration: 0, // 当前播放音乐的总时间
    isPlayStatus: false, // 当前播放音乐的状态
    lyric: [], // 音乐歌词
    activateIndex: 0, // 播放歌词音乐的索引值
    playerList: getLocalStorage('playerList') || [], // 当前播放列表
    playerIndex: getLocalStorage('playerIndex') || 0, // 当前播放列表的索引值
    modeNum:  0, // 当前播放歌曲的模式 0(顺序播放) 1(随机播放) 2(单曲循环)
    modeTypeArr: [ // 模式类型的数组
        {
            icon: 'icon-zhongxinshangchuan',
            msg: '顺序播放'
        },
        {
            icon: 'icon-suijibofang',
            msg: '随机播放'
        },
        {
            icon: 'icon-danquxunhuan',
            msg: '单曲循环'
        }
    ]
} , action){
    switch (action.type) {
        // 设置用户登陆的状态
        case IDLOGIN :
            return Object.assign({},store,{
                loginStatus: action.data
            })
        // 设置音乐播放器的数据
        case GETMENUSIDATA :
            return Object.assign({},store,{
                player: action.data
            })
        // 设置当前歌曲是否播放
        case GETISPLAY :
            return Object.assign({},store,{
                isPlay: action.data
            })
        // 获取当前歌曲的进度
        case GETPROGRESS :
            return Object.assign({},store,{
                progress: action.data
            })
        // 获取当前播放的音频时间
        case GETCURRENTTIME :
            return Object.assign({},store,{
                currentTime: action.data
            })
        // 获取当前音乐播放视频的总时间
        case GETDURATION :
            return Object.assign({},store,{
                duration: action.data
            })
        // 设置当前音乐播放的状态
        case GETPLARYSTATUS :
            return  Object.assign({},store, {
                isPlayStatus: action.data
            })
        // 获取当前音乐播放的歌词
        case GETPLARYLRYIC :
            return Object.assign({},store,{
                lyric: action.data
            })
        // 获取当前播放音乐歌词的索引值
        case GETLYLRYICINDEX :
            return Object.assign({},store,{
                activateIndex: action.data
            })
        // 获取当前播放列表的数据
        case GETPLARYELIST :
            return Object.assign({},store,{
                playerList: action.data
            })
        // 获取当前播放列表的索引值
        case GETPLAYERINDEX :
            return Object.assign({},store,{
                playerIndex: action.data
            })
        // 设置当前模式播放的数值
        case GETMODENUM :
            return Object.assign({},store,{
                modeNum: action.data
            })
        default :
            return store
    }
}
