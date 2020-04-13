import React, {Component, Fragment} from 'react'
import Url from 'url'
// 引入对应的API请求函数
import {DetailSongData, DetailSongHeadData,DetailSuccinctData, DetailSongListData} from '../../api/detail'
// 引入适用性比较搞的组件
import CommonGoBack from '../../component/common/GoBack'
import CommonMyScroll from '../../component/common/MyScroll'
// 引入当前组件下面的子组件
import DetailBannerHead from "./base/BannerHead";
import DetailSuccinctIcon from './base/SuccinctIcon'
import DetailSongList from './base/SongList'
class Detail extends Component {
    state = {
        SongHead: {}, // 歌单头部数据
        SuccinctIcon: {}, // 歌曲简绍数据
        SongList: [] // 歌曲列表
    }
    // 在组件没有被挂载的时候 我们进行请求数据
    componentDidMount() {
        this.getData()
    }
    // 请求数据的函数
    async getData () {
        // 使用url获取到query的属性值
        const id = Url.parse(this.props.location.search, true).query.id
        // 解构我们过来的数据
        const {playlist: {coverImgUrl, name, tags, description, tracks}} = await DetailSongData(id)
        const {list} = new DetailSongListData(tracks)
        list.length = 25 // 限制数组的长度
        this.setState({
            // 整合头部数据 并且更改对应的状态
            SongHead: new DetailSongHeadData(coverImgUrl, name),
            // 整合简绍歌曲数据 并且修改对应的状态
            SuccinctIcon: new DetailSuccinctData(tags, description),
            // 整合歌曲列表数据 并且修改对应的状态
            SongList: list
        })
    }
    // 编导式导航到上一个历史页面
    handleClick = () => {
        this.props.history.go(-1)
    }
    render() {
        // 解构state状态管理当中的数据
        const {SongHead, SuccinctIcon, SongList} = this.state
        // BScroll 需要滚动的区域
        const content = (
            <div className={"detail"}>
                <CommonGoBack handleClick={this.handleClick}/>
                <DetailBannerHead SongHead={SongHead}/>
                <DetailSuccinctIcon SuccinctIcon={SuccinctIcon}/>
                <DetailSongList SongList={SongList}/>
            </div>
        )
        return (
            <Fragment>
                {
                    SongList.length &&
                    <CommonMyScroll content={content} className={"detail_wrapper"}/>
                }
            </Fragment>
        )
    }
}

export default Detail
