import React, {Component, Fragment} from "react";
// 引入对应的API请求函数
import { SongListData, NewMusicData } from '../../api/recommend'
// 引入适用性比较高的组件
import CommonMyScroll from '../../component/common/MyScroll'
// 引入当当前组件下面的子组件
import RecommendSongList from "./base/SongList";
import RecommendMusicList from "./base/MusicList";
import RecommendFoot from './base/Foot'
class Recommend extends Component {
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
            newMusic: newMusic.result
        })
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
        return (
            <Fragment>
                {
                    songList.length && newMusic.length &&
                    <CommonMyScroll content={content} className={"recommend_wrapper"}/>
                }
            </Fragment>

        )
    }
}

export default Recommend
