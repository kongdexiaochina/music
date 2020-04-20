import React, {useState, useEffect, useReducer} from "react";
// 引入对应的css样式
import '../../style/player.scss'
// 引入react-redux和对应的actions
import {connect} from 'react-redux'
import {getItemPlayer, getIsMusic} from '../../redux/actions'
// 引入对应的数据请求接口
import {playerLyricData} from '../../api/player'
// 引入对应的工具类函数
import lyricParser from '../../utils/lyric'
// 引入适用性比较高的组件
import CommonGoBack from '../../component/common/GoBack'
// 引入当中模块下面的子组件
import CommonIcon from './base/Icon'
import CommonlyricText from './base/lyricText'
function Player (props) {
    // 歌词数据
    const [lyric, setLyric] = useState([])
    // 解构对应的props值
    const {playerItemObj, location: {params}, getItemPlayer, getIsMusic} = props
    // 获取对应的数据的函数
    const getData = async () => {
        const {lrc: {lyric}} = await playerLyricData(playerItemObj.id)
        setLyric(lyricParser(lyric));
    }
    // 请求数据
    useEffect(() => {
        getData()
        if (params) { // 进行向redux当中发送数据
            getItemPlayer(params.item)
        }
    }, [lyric.length])
    // 监听路由变化是否显示迷你播放器
    useEffect(() => {
        getIsMusic(false) // 不显示
        return function () { // 当组件销毁的时候 显示
            getIsMusic(true)
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
                    <CommonlyricText title={playerItemObj.name} song={playerItemObj.song} lyric={lyric}/>
                </div>
                <div className={"link_comment"}>查看歌曲评论</div>
            </div>
        )
    } else  {
        return  <div></div>
    }
}

export default connect(
    state => ({
        playerItemObj: state.playerItemObj
    }),
    {
        getItemPlayer:getItemPlayer,
        getIsMusic: getIsMusic
    }
)(Player)
