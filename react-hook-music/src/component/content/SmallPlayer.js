import React, {Fragment, useEffect, useState, useRef} from "react";
// 引入react-redux和对应的actions
import {connect} from 'react-redux'
import {
    getIsPlay,
    getCurrentTime
} from '../../redux/actions'
// 引入路由内置组件
import {NavLink} from 'react-router-dom'
// 引入对应的api请求函数
import {playerSong} from '../../api/player'
function SmallPlayer (props) {
    // 解构props值
    const {
        playerItemObj,
        isPlay,
        getIsPlayToggle,
        getCurrentTime,
        getIsPlay
    } = props
    // 歌曲路径数据
    const [url, setUrl] = useState('')
    // 音频DOM
    const audioDOM = useRef(null)
    // 歌曲的进度条的宽度
    const [width, setWidth] = useState('0%')
    // 歌曲的总时间
    const [duration, setDuration] = useState('0');
    // 音频当前播放的实时时间
    const [currentTime, setCurrentTime] = useState(0)
    // 请求歌曲路径
    const getData = async () => {
        const {data} = await playerSong(playerItemObj.id)
        setUrl(data[0].url);
    }
    // 检测isPlay的值 判断是否开启音乐
    useEffect(() => {
        ( async() => {
            if (isPlay) { // 播放
                audioDOM.current.play()
                getIsPlay(true)
            } else { // 不播放
                audioDOM.current.pause()
                getIsPlay(false)
            }
        })()
    }, [isPlay])
    // 当picUrl值发送变化的时候 进行请求数据
    useEffect(() => {
        (async () => {
            if (isPlay) { // 当isPlay的值是true的时候 我们播放音乐
                audioDOM.current.play()
                getIsPlay(true)
            }
            getData() // 获取数据
        })()
    }, [playerItemObj.picUrl])
    // 音频可以播放的时候触发
    const canPlay = () => {
        setDuration(audioDOM.current.duration);
    }
    // 当音频的currentTime时间发生变化的时候触发
    const TimeUpdate = () => {
        setCurrentTime(audioDOM.current.currentTime);
        setWidth((currentTime/duration)*100 + '%')
        getCurrentTime(currentTime)
    }
    return (
        <div className={"small_player"}>
            <span className={"play_icon"} onClick={
                () => getIsPlayToggle(!isPlay)
            } style={{backgroundPosition: isPlay ? '0 -165px' : '0 -204px'}}></span>
            <NavLink to={{pathname: '/player', params:{item:playerItemObj}}} className="musicInfo">
                <img src={playerItemObj.picUrl} alt="歌曲图片"/>
                <p>
                    {playerItemObj.name}
                    <em> - </em>
                    <Fragment>
                        {
                            playerItemObj.song.artists.map((item,index) => {
                                return <Fragment key={index}>{item.name}</Fragment>
                            })
                        }
                    </Fragment>
                </p>
                <div className={"process"}>
                    <div className={"bar"}>
                        <div className={"on"} style={{width}}></div>
                    </div>
                </div>
            </NavLink>
            <audio src={url} loop={"loop"} ref={audioDOM} autoPlay={isPlay} onCanPlay={canPlay} onTimeUpdate={TimeUpdate}></audio>
        </div>
    )
}

export default connect(
    state => ({
        playerItemObj: state.playerItemObj,
        isPlay: state.isPlay
    }),
    {
        getIsPlayToggle: getIsPlay,
        getCurrentTime: getCurrentTime,
        getIsPlay: getIsPlay
    }
)(SmallPlayer)
