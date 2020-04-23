import React, {Fragment, useEffect, useState, useRef} from "react";
// 引入react-redux和对应的actions
import {connect} from 'react-redux'
import {
    getIsPlay,
    getCurrentTime,
    getIsPlayUrl
} from '../../redux/actions'
import Pubsub from 'pubsub-js'
// 引入路由内置组件
import {NavLink} from 'react-router-dom'
// 引入对应的api请求函数
import {playerSong} from '../../api/player'
function SmallPlayer (props) {
    // 解构props值
    const {
        playerItemObj,
        isPlay,
        getCurrentTime,
        getIsPlayUrl,
        isUrl,
        getIsPlayToggle
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
        if (!data[0].url) {
            Pubsub.publish('isUrl', false)
            getIsPlayUrl(false)
        } else {
            getIsPlayUrl(true)
            Pubsub.publish('isUrl', true)
        }
    }
    // 检测isPlay的值 判断是否开启音乐
    useEffect(() => {
        if (isPlay) { // 播放
            const promise = audioDOM.current.play()
            promise.then(() => {
                audioDOM.current.play()
            }).catch(e => {})
            getIsPlayToggle(true)
        } else { // 不播放
            audioDOM.current.pause()
            getIsPlayToggle(false)
        }
    }, [isPlay])
    // 当picUrl值发送变化的时候 进行请求数据
    useEffect(() => {
        if (isPlay) { // 当isPlay的值是true的时候 我们播放音乐
            const promise = audioDOM.current.play
                promise().then(() => {
                    audioDOM.current.play()
                }).catch(e => {})
                getIsPlayToggle(true)
            }
            getData() // 获取数据
    }, [playerItemObj.id])
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
            <audio src={isUrl ? url : ''} loop={"loop"} ref={audioDOM} autoPlay={isPlay} onCanPlay={canPlay} onTimeUpdate={TimeUpdate}></audio>
        </div>
    )
}

export default connect(
    state => ({
        playerItemObj: state.playerItemObj,
        isPlay: state.isPlay,
        isUrl: state.isUrl
    }),
    {
        getIsPlayToggle: getIsPlay,
        getCurrentTime: getCurrentTime,
        getIsPlayUrl: getIsPlayUrl
    }
)(SmallPlayer)
