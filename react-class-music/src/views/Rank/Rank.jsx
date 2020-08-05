import React, { Component } from 'react';
import {getRankSong} from '../../api/index'
import {NavLink} from 'react-router-dom'
import Loading from '../../component/content/Loading'
class Rank extends Component {
    state = {
        rankSong: [] // 官方榜歌单
    }
    // 同步方法进行请求数据
    UNSAFE_componentWillMount () {
        this.getData()
    }
    async getData () {
        const result = await getRankSong()
        const rankSong = result.data.list
        rankSong.length = 4
        this.setState({
            rankSong
        })
    }
    render() {
        const {rankSong} = this.state
        if (rankSong.length) {
            // console.log(rankSong);
            return (
                <div className="rank">
                    <header className="header">
                        <section className="header_left">
                            <i className="iconfont icon-jiantouzuo" onClick={() => this.props.history.push('/')}></i>
                            <p>歌单广场</p>
                        </section>
                    </header>
                    <section className="rank_sheet">
                        <h3>官方榜</h3>
                        {
                            rankSong.map((item, index) => (
                                <NavLink key={index} to={`/recommend?id=${item.id}&name=${item.name}`}>
                                    <div className="pic">
                                        <img src={item.coverImgUrl} alt={item.name}/>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="msg">
                                        {
                                            item.tracks.map((cItem, key) => <section key={key}>{cItem.first} - {cItem.second}</section>)
                                        }
                                    </div>
                                </NavLink>
                            ))
                        }
                    </section>
                </div>
            );
        } else {
            return <Loading />
        }
    }
}

export default Rank;