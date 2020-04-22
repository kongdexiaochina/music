import React, {useState, useEffect} from "react";
// 引入url模块
import Url from 'url'
// 引入对应的css文件
import '../../style/detail.scss'
// 引入对应的数据请求函数
import {DetailSongData, DetailSongHeadData, DetailSuccinctData} from '../../api/detail'
// 引入工具类函数
import conformityData from '../../utils/conformity'
// 引入适用性比较低的组件
import ContentLoading from '../../component/content/Loading'
// 引入适用性比较高的组件
import CommonGoBack from '../../component/common/GoBack'
import CommonMyScroll from '../../component/common/MyScroll'
// 引入当前组件下面的子组件
import DeatilSuccinctHead from './base/SuccinctHead'
import DetailIconText from './base/IconText'
import DetailSongList from './base/SongList'
function Detail (props) {
    // 详情头部数据
    const [detailHead, setDetailHead] = useState({})
    // 图标简绍数据
    const [iconText, setIconText] = useState({})
    // 详情歌曲类表数据
    const [tracksList, setTracksList] = useState([])
    // 请求数据的函数
    const getData = async () => {
        const id = Url.parse(props.location.search, true).query.id
        const {playlist: {coverImgUrl, name, tags, description, tracks}} = await DetailSongData(id)
        // 头部数据
        setDetailHead(new DetailSongHeadData(coverImgUrl, name));
        // 图标简绍数据
        setIconText(new DetailSuccinctData(tags, description))
        // 详情类表数据
        tracks.length = 25
        setTracksList(conformityData(tracks))
    }
    // 请求数据
    useEffect(() => {
        getData()
    }, [])
    // 编导式导航
    const navigation = () => {
        props.history.go(-1)
    }
    // 需要滚动的区域
    const content = (
        <div className={"detail"}>
            <CommonGoBack className={"detail_goBack"} navigation={navigation}/>
            <DeatilSuccinctHead detailHead={detailHead}/>
            <DetailIconText iconText={iconText}/>
            <DetailSongList tracksList={tracksList}/>
        </div>
    )
    if (tracksList.length) {
        return <CommonMyScroll content={content} className={"wrapper_detail"}/>
    } else  {
        return <ContentLoading />
    }
}

export default Detail
