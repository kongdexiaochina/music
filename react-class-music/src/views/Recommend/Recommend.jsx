import React, { Component } from 'react';
import Url from 'url' // 解析query数据
import {getSongDetails} from '../../api/index'
import ScrollHeader from '../../component/common/ScrollHeader'
import LazyLoading from '../../component/common/LazyLoading'
class Recommend extends Component {
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
        const resultDetails = await getSongDetails(id)
        this.setState({
            songDetailsList: resultDetails.data.playlist.tracks,
            name
        })
    }
    render() {
        const {name, songDetailsList} = this.state
        if (name) {
            console.log(songDetailsList, 'recommend');
            return (
                <div className="recommend">
                    {/* 歌单详情头部 */}
                    <ScrollHeader height={90}>
                        <header className="recommend_header">
                            <section className="recommend_header_top">
                                <i className="iconfont icon-jiantouzuo" onClick={() => {
                                    this.props.history.push('/')
                                }}></i>
                                <p>{name}</p>
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
                                <li key={index}>
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
            return <div className="loading">loading...</div>
        }
    }
}

export default Recommend;
