import React, {Component, Fragment, createRef} from 'react'
// 引入react-redux当中的connect函数用于对react+redux的代码进行解耦
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
// 引入对应的actions
import {getIsMusic, getActivateIndex} from '../../redux/actions'
// 引入对应的数据请求函数
import {playerSong} from '../../api/player'
class SmallPlayer extends Component {
    constructor() {
        super(...arguments);
        this.music = createRef() // 标记音频
    }
    state = {
        url: '', // 歌曲的URL路径
        width: '0%', // 进度条的宽度值
        duration: 0, // 音频的总时间
        time: 1
    }
    // 进行请求数据
    componentWillMount() {
        this.getData()
    }
    // 进行初始的关闭音乐
    componentDidMount() {
        this.toggleIcon()
    }
    // 在获取到props的数据的时候 进行一下操作
    componentWillReceiveProps(nextProps) {
        // 获取数据
        this.getData()
        // this.toggleIcon()
        // 判断是否开启音乐
        if (nextProps.is_Music) {
            this.music.current.play().catch(e => {}) // 开启
        } else {
            this.music.current.pause() // 不开启
        }
        const {currentTime} = this.music.current
        // 如果等于0那么我们就从新设置他的currentTime值
        if (currentTime === 0) {
            this.music.current.currentTime = this.state.time
        }
    }
    // 请求数据 获得到歌曲的URL路径
    async getData () {
        const {music_obj: {id}} = this.props
        const {data} = await playerSong(id)
        this.setState({
            url: data[0].url
        })
    }
    // 切换对应的图标 和 开启关闭音乐
    toggleIcon () {
        const {is_Music, getIsMusic} = this.props
        const music = this.music.current
        if (!is_Music) { // 开启音乐
            getIsMusic(true)
            music.play().catch(e => {})
        } else { // 关闭音乐
            getIsMusic(false)
            music.pause()
        }
    }
    // 当音频加载完毕那么我们就获取他的duration值
    handleCanPaly () {
        this.setState({
            duration: this.music.current.duration
        })
    }
    // 当音频播放的时候 进行操作
    TimeUpdate () {
        const {currentTime} = this.music.current
        const {duration} = this.state
        const {lyric} = this.props
        // 获取到当前歌词时间和播放时间一直的索引
        const activateIndex = lyric.findIndex((item, index, array) => {
            const nextLyric = array[index + 1]
            if (
                item.time <= currentTime &&
                (nextLyric ? currentTime < nextLyric.time : true)
            ) {
                return index
            } else {
                return 0
            }
        })
        // 向redux当中发送这个索引值
        this.props.getActivateIndex(activateIndex)
        if (currentTime) {
            // 设置滚动条的进度 和播放速度
            this.setState({
                width: (currentTime/duration)*100 + '%',
                time: currentTime
            })
        }
    }
    render() {
        // 解构props的属性和方法
        const {music_obj, is_Music, is_small_music} = this.props
        const pathname = window.location.pathname.split('/')[1]
        // 解构state当中的数据
        const {url, width} = this.state
        return (
            <div className={"small_palyer"} style={{display: is_small_music && pathname !== 'comment' ? 'block' : 'none'}}>
                <span className={"small_palyer_icon"}
                      onClick={this.toggleIcon.bind(this)}
                      style={{backgroundPosition: is_Music ? '0 -165px' : '0 -204px'}}
                ></span>
                <NavLink to={"/player/music"} className="small_palyer_content">
                    <img src={music_obj.picUrl} alt="歌曲图片"/>
                    <p>
                        {music_obj.name}
                        <em> - </em>
                        <Fragment>
                            {
                                music_obj.song.artists.map((item, index) => {
                                    return <Fragment key={index}>{item.name}</Fragment>
                                })
                            }
                        </Fragment>
                    </p>
                    <div className="process">
                        <div className="weui_progress">
                            <div className="on" style={{width}}></div>
                        </div>
                    </div>
                </NavLink>
                <audio
                    src={url}
                    loop
                    ref={this.music}
                    onCanPlay={this.handleCanPaly.bind(this)}
                    onTimeUpdate={this.TimeUpdate.bind(this)}
                ></audio>
            </div>
        )
    }
}

export default connect(
    state => ({
        music_obj: state.music_obj,
        is_Music: state.is_Music,
        is_small_music: state.is_small_music,
        lyric: state.lyric
    }),
    {
        getIsMusic:getIsMusic,
        getActivateIndex: getActivateIndex
    }
)(SmallPlayer)
