import React, {Component} from "react";
// 引入对应的API数据请求函数
import {BannerData} from '../../api/songhot'
// 引入工具类函数用于整合数据
import conformityData from '../../utils/conformity'
// 引入适用性比较高的组件
import CommonMyScroll from '../../component/common/MyScroll'
import Loading from '../../router/loading/Loading'
// 引入当前组件下面的子组件
import SongHotBanner from './base/Banner'
import SongHotSongList from './base/List'
class SongHot extends Component {
    state = {
        description: '', // banner组件标题数据
        tracks: [] // 热歌榜列表数据
    }
    // 当组件即将挂载的时候 进行请求数据
    componentWillMount() {
        this.getBannerData()
    }
    // 请求数据的函数
    async getBannerData () {
        const {playlist: {description, tracks}} = await BannerData(1)
        tracks.length = 25 // 限制我们获取数组的长度
        this.setState({
            description: description,
            tracks: conformityData(tracks)
        })
    }
    render() {
        // 解构state状态管理里面的属性
        const {description, tracks} = this.state
        // BScroll插件需要滚动的区域
        const content = (
            <div className={"songhot"}>
                <SongHotBanner description={description}/>
                <SongHotSongList tracks={tracks}/>
            </div>
        )
        if (tracks.length) {
            return <CommonMyScroll content={content} className={"songhot_wrapper"}/>
        } else {
            return <Loading />
        }
    }
    //  当组件销毁的时候 我们要通过以下代码防止出现内存泄漏
    componentWillUnmount = () => {
        this.setState = (s)=>{
            return;
        };
    }
}

export default SongHot
