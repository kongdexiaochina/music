import React, {useState, useEffect} from "react";
// 引入对应的css样式
import '../../style/player.scss'
// 引入react-redux和对应的actions
import {connect} from 'react-redux'
import {getItemPlayer, getIsMusic, getIsPlay} from '../../redux/actions'
// 引入对应的数据请求接口
import {playerLyricData} from '../../api/player'
// 引入路由内置的组件
import {NavLink} from 'react-router-dom'
// 引入对应的工具类函数
import lyricParser from '../../utils/lyric'
// 引入适用性比较高的组件
import CommonGoBack from '../../component/common/GoBack'
// 引入当中模块下面的子组件
import CommonIcon from './base/Icon'
import CommonLyricText from './base/lyricText'
function Player (props) {
    // 歌词数据
    const [lyric, setLyric] = useState([])
    // 解构对应的props值
    const {playerItemObj, location: {params}, getItemPlayer, getIsMusic, getIsPlay} = props
    // 获取对应的数据的函数
    const getData = async () => {
        if (Object.keys(playerItemObj).length) {
            const {lrc: {lyric}} = await playerLyricData(playerItemObj.id)
            setLyric(lyricParser(lyric));
        }
    }

    // 请求数据
    useEffect(() => {
        getData()
        if (params) { // 进行向redux当中发送数据
            getItemPlayer(params.item)
        }
    }, [Object.keys(playerItemObj).length])

    // 监听路由变化是否显示迷你播放器
    useEffect(() => {
        getIsMusic(false) // 不显示
        getIsPlay(true) // 播放
        return function () { // 当组件销毁的时候 显示迷你播放器 和 播放
            getIsMusic(true)
            getIsPlay(true)
        }
    }, [props.location])
    // 编导式导航
    const navigation = () => {
        props.history.go(-1)
    }
    if (lyric.length) {
        return (
            <div className={"player"}>
                <div className="player_bgc" style={{backgroundImage: `url(${playerItemObj.picUrl})`}}></div>
                <CommonGoBack className={"player_goback"} navigation={navigation}/>
                <div className="wrapper">
                    <CommonIcon picUrl={playerItemObj.picUrl}/>
                    <CommonLyricText title={playerItemObj.name} song={playerItemObj.song} lyric={lyric}/>
                </div>
                <div className={"link_comment"}>
                    <NavLink to={"/comment/id=?" + playerItemObj.id}>查看歌曲评论</NavLink>
                </div>
            </div>
        )
    } else  {
        return  <div></div>
    }
}

export default connect(
    state => ({
        playerItemObj: state.playerItemObj,
        currentTime: state.currentTime
    }),
    {
        getItemPlayer:getItemPlayer,
        getIsMusic: getIsMusic,
        getIsPlay: getIsPlay
    }
)(Player)
