import React, {Component} from 'react';
import {connect} from "react-redux";
import {getIsLogin} from '../../../store/action'
import {getUserSong,getUserFollows,getUserOut} from '../../../api/index'
import BoutiqueSong from '../../../component/content/BoutiqueSong'
import LazyLoading from '../../../component/common/LazyLoading'
class MyUserShow extends Component {
    state = {
        userSong: [], // 用户歌单数据
        followList: [] // 用户关注列表
    }
    UNSAFE_componentWillMount() {
        this.getUserData()
    }
    // 获取用户歌单相关的数据
    async getUserData () {
        const userId = this.props.userId
        const resultSong = await getUserSong(userId)
        const resultFollow = await getUserFollows(userId)
        this.setState({
            userSong: resultSong.data.playlist.map(item => ({
                playCount: item.playCount,
                id:item.id,
                name:item.name,
                picUrl:item.coverImgUrl
            })),
            followList: resultFollow.data.follow
        })
    }
    // 退出登陆
    handleOut = async () => {
        await getUserOut()
        this.props.getIsLogin({})
    }
    render() {
        const {loginStatus} = this.props
        const {userSong,followList} = this.state
        return (
            <>
                <div className={'my_user'}>
                    <div className="my_user_delete">
                        <img src={loginStatus.avatarUrl} alt={loginStatus.nickname} className={'avatar'}/>
                        <p className={'user_nickname'}>{loginStatus.nickname}</p>
                        <p className={'user_size'}>
                            <span>关注：{loginStatus.follows}</span>
                            |
                            <span>粉丝：{loginStatus.followeds}</span>
                        </p>
                        <p className={'level'}>Lv.{loginStatus.playlistCount}</p>
                    </div>
                </div>
                <div className="discover_song">
                    <header className={'discover_song_head'}>
                        <h3>用户歌单</h3>
                    </header>
                    <BoutiqueSong recommend={userSong}/>
                </div>
                <section className={'follow'}>
                    <h3>{loginStatus.nickname}的关注</h3>
                    <ul>
                        {
                            followList.map(item => (
                                <li key={item.py}>
                                    <LazyLoading src={item.avatarUrl} />
                                    <div className="info">
                                        <h4>{item.nickname}</h4>
                                        <p className={'text'}>{item.signature || '暂无'}</p>
                                        <section>
                                            <span>歌单:{item.playlistCount}</span>
                                            <span style={{margin: '0 .1rem'}}>|</span>
                                            <span>粉丝:{item.followeds}</span>
                                        </section>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </section>
                <button className={'out'} onClick={this.handleOut}>退出登陆</button>
            </>
        );
    }
}

export default  connect(
    state => ({
        loginStatus: state.loginStatus
    }),
    {getIsLogin}
)(MyUserShow);
