import React, {useState, useEffect} from "react";
// 引入对应的css样式文件
import '../../style/recommend.scss'
// 引入对应的api请求函数
import {SongListData, NewMusicData} from '../../api/recommend'
// 引入适用性比较高的组件
import CommonMyScroll from '../../component/common/MyScroll'
// 引入当前模块下面的子组件
import RecommendSongList from './base/SongList'
import RecommendNewSongList from './base/NewSongList'
import RecommendFoot from './base/Foot'
// 引入对应的工具类函数
import toArray from '../../utils/ToArray'
function Recommend () {
    // 推荐歌单数据
    const [songList, setSongList] = useState([])
    // 最新音乐数据
    const [newMusicList, setNewMusicList] = useState([])
    // 请求数据的函数
    const getData = async () => {
        const songData = await SongListData(6) // 获取推荐歌单数据
        setSongList(songData.result)
        const newMusicList = await NewMusicData() // 获取最新音乐数据
        setNewMusicList(newMusicList.result)
    }
    // 在useEffecthook函数里面进行请求数据
    useEffect(() => {
        getData()
    }, [])
    // 需要滚动的区域
    const content = (
        <div className={"recommend"}>
            <h3 className={"recommend_title"}>推荐歌单</h3>
            <RecommendSongList songList={toArray(3, songList)}/>
            <h3 className={"recommend_title"}>最新音乐</h3>
            <RecommendNewSongList newMusicList={newMusicList}/>
            <RecommendFoot />
        </div>
    )
    if (songList.length && newMusicList.length) {
        return <CommonMyScroll content={content} className={"wrapper_recommend"}/>
    } else  {
        return <div></div>
    }
}

export default Recommend
