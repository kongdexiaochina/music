import React, {Fragment, useEffect, useState, useRef} from "react";
// 引入react-redux和对应的actions
import {connect} from 'react-redux'
import {getIsPlay} from '../../redux/actions'
// 引入路由内置组件
import {NavLink} from 'react-router-dom'
// 引入对应的api请求函数
import {playerSong} from '../../api/player'
function SmallPlayer (props) {
    // 解构props值
    const {playerItemObj, isPlay, getIsPlayToggle} = props
    // 歌曲路径数据
    const [url, setUrl] = useState('')
    // 音频DOM
    const audioDOM = useRef(null)
    // 请求歌曲路径
    const getData = async () => {
        const {data} = await playerSong(playerItemObj.id)
        setUrl(data[0].url);
    }
    // 检测isPlay的值 判断是否开启音乐
    useEffect(() => {
        if (isPlay) {
            audioDOM.current.play()
        } else {
            audioDOM.current.pause()
        }
        console.log(audioDOM.current);
    }, [isPlay])
    // 当id值发送变化的时候 进行请求数据
    useEffect(() => {
        console.log('获取到了数据');
        getData()
    }, [playerItemObj.id])
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
                <div className="process">
                    <div className="bar"></div>
                </div>
            </NavLink>
            <audio src={url} loop={"loop"} ref={audioDOM} autoPlay={isPlay}></audio>
        </div>
    )
}

export default connect(
    state => ({
        playerItemObj: state.playerItemObj,
        isPlay: state.isPlay
    }),
    {getIsPlayToggle: getIsPlay}
)(SmallPlayer)
