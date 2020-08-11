import React, {Component,createRef,Fragment} from 'react';
import {connect} from 'react-redux'
import {getIsPlay,getProgress,getCurrentTime,getDuration,getActivateIndex,getPlayerIndex,getMenusData,getPlayLyric} from '../../store/action'
import {NavLink,withRouter} from 'react-router-dom'
import localStorage from '../../utility/localStorage'
import {getIsMenusPlay, getSongRUrl} from '../../api/index'
import Prompt from "../content/Prompt";
const {setLocalStorage,getLocalStorage} = localStorage
class SmallPlayer extends Component {
    constructor(props) {
        super(props);
        // 音频节点
        this.audioRef = createRef()
    }
    state = {
        msg: ''
    }
    UNSAFE_componentWillMount() {
        if (Object.keys(getLocalStorage('player') || []).length) {
            this.modePlayer(getLocalStorage('player'), true)
        }
    }
    // 点击切换音频播放的状态
    handleClickToggle = () => {
        const {isPlay,getIsPlay} = this.props
        console.log(isPlay)
        if (!isPlay) {
            getIsPlay(true)
            this.handlePlay()
        } else {
            getIsPlay(false)
            this.handlePause()
        }
    }
    // 当视频的时间改变的时候触发
    handleTimeupdate = () => {
        console.log('视频正在播放');
        const audio = this.audioRef.current
        const {currentTime,lyric,getActivateIndex} = this.props
        // 当前播放的音频数值
        this.props.getCurrentTime(audio.currentTime)
        // 播放音乐的进度条宽度
        const width = ((audio.currentTime / audio.duration) || 0) * 100 + '%'
        this.props.getProgress(width)
        // 当前激活歌词的index值
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
        getActivateIndex(activateIndex === -1 ? 0 : activateIndex)
    }
    // 点击播放视频
    handlePlay () {
        const audio = this.audioRef.current
        let playPromise = audio.play()
        if (playPromise !== undefined) {
            playPromise.then(() => {
                audio.play()
            }).catch(()=> {
            })
        }
    }
    // 点击关闭视频
    handlePause () {
        const audio = this.audioRef.current
        if (audio) {
            audio.pause()
        }
    }
    // 开始播放视频的时候触发
    handleCanPlay = () => {
        const {getDuration,isPlay} = this.props
        // 音频总共数值
        const audio = this.audioRef.current
        getDuration(audio.duration)
        if (isPlay) {
            this.handlePlay()
        }
        console.log('视频播放了')
    }
    // 模式播放视频
    async modePlayer (player, is) {
        const {getPlayLyric,getMenusData} = this.props
        try {
            await getIsMenusPlay(player.id)
            const result = await getSongRUrl(player.id)
            const url = result.data.data[0].url
            getMenusData({...player, url})
            setLocalStorage('player', player)
            if (url && (!is)) {
                const audio = this.audioRef.current
                audio.load()
                const playPromise =audio.play()
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        audio.play()
                    }).catch(()=> { })
                }
            } else {
               if (!is) {
                   this.handlePause()
                   this.setState({
                       msg: '该歌曲,无版权权限'
                   }, () => {
                       this.handlePause()
                       getPlayLyric([])
                       this.promptRef.handlePromptToggle()
                   })
               }
            }
        } catch (e) {
            console.log(e, '该歌曲,无版权权限')
            this.setState({
                msg: '该歌曲,无版权权限'
            }, () => {
                this.handlePause()
                getPlayLyric([])
                getMenusData({...player, url: null})
                setLocalStorage('player', player)
                this.promptRef.handlePromptToggle()
            })
        }
    }
    // 播放视频的完成的时候触发
    handleEonended = async () => {
        const {modeNum,playerList,playerIndex,getPlayerIndex} = this.props
        switch (modeNum) {
            case 0 : // 顺序播放
                let player = {}
                if (playerIndex === (playerList.length-1)) {
                    getPlayerIndex(0)
                    setLocalStorage('playerIndex', 0)
                    player = playerList[0]
                } else {
                    getPlayerIndex(playerIndex + 1)
                    setLocalStorage('playerIndex', playerIndex + 1)
                    player = playerList[playerIndex + 1]
                }
                this.modePlayer(player, false)
                break;
            case 1 : // 随机播放
                const random = Math.floor(Math.random()*Math.floor(playerList.length))
                getPlayerIndex(random)
                setLocalStorage('playerIndex', random)
                this.modePlayer(playerList[random], false)
                break
            case 2 : // 单曲循环
                try {
                    await getIsMenusPlay(getLocalStorage('player').id)
                    this.audioRef.current.load()
                    this.handlePlay()
                } catch (e) {
                    console.log(e, '该歌曲,无版权权限')
                    this.setState({
                        msg: '该歌曲,无版权权限'
                    }, () => {
                        this.handlePause()
                        getPlayLyric([])
                        setLocalStorage('player', getLocalStorage('player'))
                        this.promptRef.handlePromptToggle()
                    })
                }
                break
            default :
                console.log('default')
        }
    }
    render() {
        const {player,location,progress,isPlay} = this.props
        const {msg} = this.state
        if (Object.keys(player).length) {
            return (
                <>
                    <div className={'small_player'} style={{display: location.pathname === '/player' ? 'none' : 'flex'}}>
                        <i className={isPlay ? 'iconfont icon-bofang1' : 'iconfont icon-kaishi'} onClick={this.handleClickToggle}></i>
                        <NavLink  to={'/player'}>
                            <img src={player.picUrl} alt={player.name}/>
                        </NavLink>
                        <div className="info">
                            <div className="msg">
                                <div className="text">
                                    <span>{player.name}</span>
                                    <span> / {player.al.name} - {player.ar[0].name}</span>
                                </div>
                                <div className="bar" >
                                    <div className="on" style={{width: progress}}></div>
                                </div>
                            </div>
                        </div>
                        <audio
                            src={player.url}
                            ref={this.audioRef}
                            preload="metadata"
                            onTimeUpdate={this.handleTimeupdate}
                            onCanPlay={this.handleCanPlay}
                            onEnded={this.handleEonended}
                            className={'player_audio'}
                        ></audio>
                    </div>
                    <Prompt msg={msg} ref={promptRef => this.promptRef = promptRef}/>
                </>
            );
        } else {
            return <Fragment></Fragment>
        }
    }
}

export default withRouter(connect(
    state => ({
        player: state.player,
        progress: state.progress,
        isPlay: state.isPlay,
        currentTime: state.currentTime,
        lyric: state.lyric,
        modeTypeArr: state.modeTypeArr,
        modeNum: state.modeNum,
        playerList: state.playerList,
        playerIndex: state.playerIndex
    }),
    {getIsPlay,getProgress,getCurrentTime,getDuration,getActivateIndex,getPlayerIndex,getMenusData,getPlayLyric}
)(SmallPlayer))


