import React, {useState, useEffect} from "react";
// 引入对应的css样式
import '../../style/player.scss'
import Pubsub from 'pubsub-js'
// 引入react-redux和对应的actions
import {connect} from 'react-redux'
import {
    getItemPlayer,
    getIsMusic,
    getIsPlay,
    getIsPlayUrl
} from '../../redux/actions'
// 引入对应的数据请求接口
import {playerLyricData} from '../../api/player'
// 引入路由内置的组件
import {NavLink} from 'react-router-dom'
// 引入对应的工具类函数
import lyricParser from '../../utils/lyric'
// 引入适用性比较高的组件
import CommonGoBack from '../../component/common/GoBack'
// 引入适用性比较低的组件
import ContentLoading from '../../component/content/Loading'
// 引入当中模块下面的子组件
import CommonIcon from './base/Icon'
import CommonLyricText from './base/lyricText'
function Player (props) {
    // 歌词数据
    const [lyric, setLyric] = useState([])
    // 没有歌曲数据
    const [lyricNone, setLyricNone] = useState('')
    // 解构对应的props值
    const {
        playerItemObj,
        location: {
            params
        },
        getItemPlayer,
        getIsMusic,
        getIsPlay,
        isUrl
    } = props
    // 获取对应的数据的函数
    const getData = async () => {
        if (params) { // 我们在组件之间切换的时候 走进if里面并且获取对应的数据
            const {lrc} = await playerLyricData(params.item.id)
            if (lrc) {
                setLyric(lyricParser(lrc.lyric));
            }
        } else { // 反之在我们页面刷新的时候触发else 并且获取对应的数据
            const {lrc} = await playerLyricData(playerItemObj.id)
            if (lrc) {
                setLyric(lyricParser(lrc.lyric));
            }
        }
        setLyricNone("暂无歌曲数据")
    }
    // 进行向redux当中发送数据
    useEffect(() => {
        if (params) {
            getItemPlayer(params.item)
            localStorage.setItem("itemPlayer", JSON.stringify(params.item))
        }
    }, [Object.keys(playerItemObj).length])
    // 检测歌词的变化 并且请求数据
    useEffect(() => {
        getData()
    }, [lyric.length])
    // 监听路由变化是否显示迷你播放器
    useEffect(() => {
        getIsMusic(false) // 不显示
        getIsPlay(true) // 播放
        getIsPlayUrl(true)
        const token = Pubsub.subscribe("isUrl", (type, data) => {
            if (!data) {
                console.log(data)
                var result = setTimeout(() => {
                    navigation()
                }, 2000)
                return () => {
                    clearTimeout(result)
                }
            }
        });
        return function () { // 当组件销毁的时候 显示迷你播放器 和 播放
            getIsMusic(true)
            getIsPlay(true)
            Pubsub.unsubscribe(token) // 清除异步事件
        }
    }, [props.location])
    // 编导式导航
    const navigation = () => {
        props.history.go(-1)
    }
    if (Object.keys(playerItemObj).length && isUrl) {
        return (
            <div className={"player"}>
                <div className="player_bgc" style={{backgroundImage: `url(${playerItemObj.picUrl})`}}></div>
                <CommonGoBack className={"player_goback"} navigation={navigation}/>
                <div className="wrapper">
                    <CommonIcon picUrl={playerItemObj.picUrl}/>
                    <CommonLyricText title={playerItemObj.name} song={playerItemObj.song} lyric={lyric} lyricNone={lyricNone}/>
                </div>
                <div className={"link_comment"}>
                    <NavLink to={"/comment/id=?" + playerItemObj.id}>查看歌曲评论</NavLink>
                </div>
            </div>
        )
    } else  {
        return  (
            <div className={"player"}>
                <div className="player_bgc" style={{backgroundImage: `url(${playerItemObj.picUrl})`}}></div>
                <ContentLoading />
            </div>
        )
    }
}

export default connect(
    state => ({
        playerItemObj: state.playerItemObj,
        currentTime: state.currentTime,
        isPlayError: state.isPlayError,
        isUrl: state.isUrl
    }),
    {
        getItemPlayer:getItemPlayer,
        getIsMusic: getIsMusic,
        getIsPlay: getIsPlay,
        getIsPlayUrl: getIsPlayUrl
    }
)(Player)
