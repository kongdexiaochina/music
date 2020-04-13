import React, {Component, Fragment} from "react";
// 引入对应的API请求函数
import { SongListData, NewMusicData } from '../../api/recommend'
// 引入对应的actions
import {getMusicData} from '../../redux/actions'
// 引入connect用于解耦react+redux代码
import {connect} from 'react-redux'
// 引入适用性比较高的组件
import CommonMyScroll from '../../component/common/MyScroll'
import conformityData from '../../utils/conformity'
import Loading from '../../router/loading/Loading'
// 引入当当前组件下面的子组件
import RecommendSongList from "./base/SongList";
import RecommendMusicList from "./base/MusicList";
import RecommendFoot from './base/Foot'
class Recommend extends Component {
    constructor(props) {
        super(props);
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }
    state = {
        songList: [], // 歌单数据
        newMusic: [] // 最新音乐
    }
    // 我们在组件即将被挂载的时候 进行请求数据
    componentWillMount(){
        this.getData()
    }
    // 请求数据的方法
    async getData () {
        const songList = await SongListData(6)
        const newMusic = await NewMusicData()
        this.setState({
            songList: songList.result,
            newMusic: conformityData(newMusic.result)
        })
    }
    componentDidCache = () => {
        this.props.getMusicData(this.state.newMusic)
    }
    componentDidRecover = () => {
        this.props.getMusicData(this.state.newMusic)
    }
    render () {
        // 解构state当中的数据 并且向子组件传递对应的属性
        const { songList, newMusic } = this.state
        // 需要用BScroll滚动的区域
        const content = (
            <div className={"recommend"}>
                <RecommendSongList songList={songList}/>
                <RecommendMusicList newMusic={newMusic}/>
                <RecommendFoot />
            </div>
        )
        if (songList.length) {
            return (
                <Fragment>
                    {
                        <CommonMyScroll content={content} className={"recommend_wrapper"}/>
                    }
                </Fragment>
            )
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

export default connect(
    null, {
        getMusicData: getMusicData
    }
)(Recommend)
