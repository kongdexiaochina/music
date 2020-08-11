import React, { Component } from 'react';
import Url from 'url' // 解析query数据
import {connect} from 'react-redux'
import {getSongDetails,getUserRecommend,getSongRUrl} from '../../api/index'
import {getMenusData,getPlayerList,getIsPlay,getPlayerIndex} from '../../store/action'
import ScrollHeader from '../../component/common/ScrollHeader'
import LazyLoading from '../../component/common/LazyLoading'
import Loading from '../../component/content/Loading'
import localStorage from "../../utility/localStorage";
const {setLocalStorage,getLocalStorage} = localStorage
class Recommend extends Component {
    constructor(props) {
        super(props)
        props.cacheLifecycles.didRecover(this.componentDidRecover);
    }
    state = {
        songDetailsList: [], // 歌单详情列表数据
        name: ''// 歌单名称
    }
    // 同步的方法进行请求数据
    UNSAFE_componentWillMount () {
        this.getData()
    }
    async getData () { // 请求歌单详情数据
        const {id,name} = Url.parse(this.props.location.search,true).query
        if (id === 'daily') { // 每日推荐
            const resultRecommend = await getUserRecommend()
            console.log(resultRecommend.data.data.dailySongs)
            this.setState({
                songDetailsList: resultRecommend.data.data.dailySongs
            })
        } else {
            const resultDetails = await getSongDetails(id)
            this.setState({
                songDetailsList: resultDetails.data.playlist.tracks,
                name
            })
        }
    }
    // 点击歌曲
    handleClick = async (item,index) => {
        // 获取歌曲的url路径
        const resutlSongUrl = await getSongRUrl(item.id)
        // 歌曲播放需要的数据
        const option = {
            name: item.name,
            id: item.id,
            picUrl: item.al.picUrl,
            ar: item.ar,
            al: item.al,
            url: resutlSongUrl.data.data[0].url
        }
        // 整合歌单列表的数据 并且向全局状态发送值
        const playerList = this.state.songDetailsList.map(item => (
            {
                name: item.name,
                id: item.id,
                picUrl: item.al.picUrl,
                ar: item.ar,
                al: item.al
            }
        ))
        const init = getLocalStorage('hot_history') || []
        if (init.indexOf(item.name) === -1) {
            init.push(item.name)
            setLocalStorage('hot_history', init)
        }
        // 进行本地存储
        setLocalStorage('player', option)
        setLocalStorage('playerList', playerList)
        setLocalStorage('playerIndex', index)
        // 发送歌曲的数据
        this.props.getMenusData(option)
        this.props.getPlayerList(playerList)
        this.props.getPlayerIndex(index)
        this.props.getIsPlay(true) // 播放
        this.props.history.push('/player') // 跳转
    }
    // 当前进入路由缓存组件的时候触发
    componentDidRecover = () => {
        this.getData()
    }
    render() {
        const {name, songDetailsList} = this.state
        if (songDetailsList.length) {
            return (
                <div className="recommend">
                    {/* 歌单详情头部 */}
                    <ScrollHeader height={100}>
                        <header className="recommend_header">
                            <section className="recommend_header_top">
                                <i className="iconfont icon-jiantouzuo" onClick={() => {
                                    this.props.history.goBack()
                                }}></i>
                                <p>{name || '每日推荐'}</p>
                            </section>
                            <section className="recommend_header_all">
                                <i className="iconfont icon-bofang"></i>
                                <p>播放全部</p>
                            </section>
                        </header>
                    </ScrollHeader>
                    {/* 歌单详情列表 */}
                    <ul className="recommend_list">
                        {
                            songDetailsList.map((item, index) => (
                                <li key={index} onClick={() => this.handleClick(item,index)}>
                                    <div className="song_des">
                                        <LazyLoading src={item.al.picUrl}/>
                                        <div className="song_des_info">
                                            <p className="title">{item.name}</p>
                                            <p>{item.ar[0].name} - {item.al.name}</p>
                                        </div>
                                    </div>
                                    <div className="song_mv">
                                        <i className="iconfont icon-tuya-"></i>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            );
        } else {
            return <Loading />
        }
    }
}

export default connect(
    null,
    {getMenusData,getPlayerList,getIsPlay,getPlayerIndex}
)(Recommend);
