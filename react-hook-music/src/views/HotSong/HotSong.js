import React, {useState, useEffect} from "react";
// 引入对应的css样式
import '../../style/hotsong.scss'
// 引入对应的api请求函数
import {BannerData} from '../../api/hotsong'
// 引入对应的工具类函数
import conformityData from '../../utils/conformity'
// 引入适用性比较高的组件
import CommonMyScroll from '../../component/common/MyScroll'
// 引入适用性比较低的组件
import ContentLoading from '../../component/content/Loading'
// 引入当前模块下面的子组件
import HotSongBanner from './base/Banner'
import HotSongList from './base/SongList'
function HotSong () {
    // banner标题文字
    const [description, setDescription] = useState('更新日期：4月18日')
    // 热门榜的歌曲列表数据
    const [tracks, setTracks] = useState([])
    // 请求数据的函数
    const getData = async () => {
        // 解构出来请求的数据
        const {playlist: {description, tracks}} = await BannerData(1)
        setDescription(description) // banner文字数据
        // 热门榜的歌曲列表数据
        tracks.length = 25
        setTracks(conformityData(tracks));
    }
    // 请求数据
    useEffect(() => {
        getData()
    }, [])
    // 需要滚动的内容
    const content = (
        <div className={"hotsong"}>
            <HotSongBanner description={description}/>
            <HotSongList tracks={tracks}/>
        </div>
    )
    if (tracks.length) {
        return <CommonMyScroll content={content} className={"wrapper_hotsong"}/>
    } else  {
        return <ContentLoading />
    }
}

export default HotSong
