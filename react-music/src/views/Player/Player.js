import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
// 引入对应的API请求函数
import {playerLyricData} from '../../api/player'
// 引入connect用于解耦react+redux代码
import {connect} from 'react-redux'
// 引入对应的actions
import {getMusicObj, getIsSmallMusic, getIsMusic} from '../../redux/actions'
// 引入适用性比较高的组件
import CommonGoBack from '../../component/common/GoBack'
// 引入当前组件下面的子组件
import PlayerIconMusic from './base/IconMusic'
import PlayerSongLyric from './base/SongLyric'
class Player extends Component{
    state = {
        lyric: '' // 歌词数据
    }
    // 我们在组件没有挂载完成的时候 需要获取到我们当前需要播放的歌曲 并且获取当前组件的一些数据
    // 并且显示迷你播放器 还有让音乐播放
    componentWillMount() {
        this.getMusicData() //获取数据
        this.props.getIsMusic(true) // 开始播放
        this.props.getIsSmallMusic(false) // 不显示迷你播放器
    }
    // 获取当前需要播放的歌曲 并且做出本地存储 还要向redux发送数据
    async getMusicData () {
        // 解构对应的props值
        const {music_data,match:{params}, getMusicObj} = this.props
        // 如果获取到了值歌词的数据 那么就是歌词数据 反之是本地存储的数据
        let obj = music_data[params.index] || JSON.parse(localStorage.getItem("musicObj"))
        getMusicObj(obj) // 向redux当中发送数据
        // 获取歌词数据
        const {lrc: {lyric}} = await playerLyricData(obj.id)
        this.setState({ // 更改state的状态
            lyric
        })
        localStorage.setItem("name", obj.name)
    }
    // 编导式导航 到上一个历史页面
    handleClick = () => {
        const {history} = this.props
        history.go(-1)
    }
    render() {
        // 解构props当中的属性值
        const {music_obj} = this.props
        // 解构state当中的属性值
        const {lyric} = this.state
        return (
            <div className={"player"}>
                <div className="player_bgc" style={{backgroundImage: `url(${music_obj.picUrl})`}}></div>
                <div className="wrapper">
                    <CommonGoBack handleClick={this.handleClick}/>
                    <PlayerIconMusic url={music_obj.picUrl}/>
                    <PlayerSongLyric titleObj={music_obj.song} lyric={lyric}/>
                    <NavLink to={"/comment/" + music_obj.id} className={"link"}>
                        查看歌曲评论
                    </NavLink>
                </div>
            </div>
        )
    }
    // 在此处完成组件的卸载和数据的销毁。并且不显示迷你播放器 并且开启音乐
    componentWillUnmount (){
        this.props.getIsSmallMusic(true) // 显示迷你播放器
        this.props.getIsMusic(true) // 开启音乐
    }
}

export default connect(
    state => ({
        music_data: state.music_data,
        music_obj: state.music_obj,
        is_Music: state.is_Music
    }),
    {
        getMusicObj: getMusicObj,
        getIsSmallMusic: getIsSmallMusic,
        getIsMusic: getIsMusic
    }
)(Player)
