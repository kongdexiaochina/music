import React, {useState, useEffect} from "react";
// 引入对应的css样式
import '../../style/player.scss'
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
    const [lyric, setLyric] = useState('')
    const params = props.location.params
    let item = {}
    if (params) {
        item = params.item
        localStorage.setItem("itemPlayer", JSON.stringify(params.item))
    } else {
        item = JSON.parse(localStorage.getItem("itemPlayer"))
    }
    // 获取对应的数据的函数
    const getData = async () => {
        const {lrc: {lyric}} = await playerLyricData(item.id)
        setLyric(lyricParser(lyric));
    }
    // 请求数据
    useEffect(() => {
        getData()
    }, [])
    // 编导式导航
    const navigation = () => {
        props.history.go(-1)
    }
    console.log(item);
    if (lyric.length) {
        return (
            <div className={"player"}>
                <div className="player_bgc" style={{backgroundImage: `url(${item.picUrl})`}}></div>
                <CommonGoBack className={"player_goback"} navigation={navigation}/>
                <div className="wrapper">
                    <CommonIcon picUrl={item.picUrl}/>
                    <CommonlyricText title={item.name} song={item.song} lyric={lyric}/>
                </div>
                <div className={"link_comment"}>查看歌曲评论</div>
            </div>
        )
    } else  {
        return  <div></div>
    }
}

export default Player
