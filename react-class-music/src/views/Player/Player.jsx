import React, {Component, createRef} from 'react';
import {connect} from 'react-redux'
import {
    getIsPlay,getMenusData,
    getPlayStatus,getPlayLyric,
    getPlayerIndex,getModeNum
} from '../../store/action'
import {getSongRUrl, getSongLyric, getIsMenusPlay} from '../../api/index'
import MyBscroll from "../../component/common/MyBscroll";
import Prompt from "../../component/content/Prompt";
import transTime from '../../utility/transTime'
import lyricParser from '../../utility/parseLyric'
import PlayerList from './base/PlayerList'
import localStorage from '../../utility/localStorage'
import animation from '../../utility/animation'
import needle from '../../static/images/needle.png'
import disc from '../../static/images/disc.png'
const {setLocalStorage} = localStorage
class Player extends Component {
    constructor(props) {
        super(props);
        // 歌词滚动内容
        this.lyricContent = createRef()
        // 光片滚动区域的Ref
        this.dishContent = createRef()
        // 歌词区域的Ref
        this.lyricMain = createRef()
        // 进度条区域的Ref
        this.lineRef = createRef()
        // 是否显示播放列表
        this.playerList = createRef()
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }
    state = {
        msg: '', // 提示信息
        isShow: false // 是的显示播放列表
    }
    UNSAFE_componentWillMount() {
        this.getData(this.props.player, () => {})
    }
    componentDidMount() {
        // 获取音频的DOM节点
        this.playerDOM = document.querySelector('.player_audio')
        // 初始都opacity显示视频
        this.lyricMain.current.style.opacity = 1
        this.lyricMain.current.style.opacity = 1
        // 初始是否可以播放音频
        if (this.props.isPlay) {
            this.handlePlay()
        }
    }
    // 获取当前播放音频的相关数据
    getData = async (player,cd) => {
        const {getMenusData,getPlayLyric} = this.props
        try {
            await getIsMenusPlay(player.id)
            const result = await getSongRUrl(player.id)
            const resultLyric = await getSongLyric(player.id)
            const url = result.data.data[0].url
            if (url) {
                getMenusData({
                    ...player,
                    url
                })
                setLocalStorage('player', {
                    ...player,
                    url
                })
                getPlayLyric(lyricParser(resultLyric.data.lrc.lyric))
            } else {
                this.setState({
                    msg: '该歌曲,无版权权限'
                }, () => {
                    this.handlePause()
                    getPlayLyric([])
                    this.promptRef.handlePromptToggle()
                })
            }
            cd()
        } catch (e) {
            this.setState({
                msg: '该歌曲,无版权权限'
            }, () => {
                this.handlePause()
                getPlayLyric([])
                this.promptRef.handlePromptToggle()
            })
        }
    }
    // 点击切换视频
    handleTogglePlayer = () => {
        const {isPlay,getIsPlay} = this.props
        if (!isPlay) {
            getIsPlay(true)
            this.handlePlay()
        } else {
            getIsPlay(false)
            this.handlePause()
        }
    }
    // 点击播放视频
    handlePlay () {
        const audio = this.playerDOM
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
        const audio = this.playerDOM
        if (audio) {
            audio.pause()
        }
    }
    // 切换视频的状态
    handleDishToggle = (dishContent,lyricMain) => {
        const {getPlayStatus,isPlayStatus} = this.props
        animation(dishContent, {
            opacity: 0
        }, .4, () => {
            getPlayStatus(!isPlayStatus)
            animation(lyricMain, {
                opacity: 1
            }, .4, () => {
                getPlayStatus(!isPlayStatus)
            })
        })
    }
    // 点击进度条
    handleClickSlide = e => {
        if (this.playerDOM.duration) {
            //人为手动的修改了currentTime属性
            const currentTime =  e.nativeEvent.offsetX * this.playerDOM.duration / this.lineRef.current.clientWidth
            if(!this.props.isPlay) {
                this.props.getIsPlay(true)
                this.handlePlay()
            }
            this.playerDOM.currentTime = currentTime
        }
    }
    // 点击播放当前歌单的上一首歌曲
    handleUp = async () => {
        const {playerList,playerIndex,getPlayerIndex} = this.props
        let player = {}
        if (playerIndex) {
            getPlayerIndex(playerIndex - 1)
            setLocalStorage('playerIndex', playerIndex - 1)
            player = playerList[playerIndex - 1]
        } else {
            getPlayerIndex(playerList.length - 1)
            setLocalStorage('playerIndex', playerList.length - 1)
            player = playerList[playerList.length - 1]
        }
        this.handleToggleAudio(player)
    }
    // 点击播放当前歌单的下一首歌曲
    handleNext = async () => {
        const {playerList,playerIndex,getPlayerIndex} = this.props
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
        this.handleToggleAudio(player)
    }
    // 切换歌曲
    handleToggleAudio = async (player) => {
        const {getMenusData,getIsPlay} = this.props
        getMenusData(player)
        setLocalStorage('player', player)
        this.getData(player, () => {
            getIsPlay(true)
            const audio = this.playerDOM
            audio.load()
            const playPromise =audio.play()
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    audio.play()
                }).catch(()=> { })
            }
        })
    }
    // 当props的数据发生改变的时候触发该声明周期函数
    componentDidUpdate(nextProps) {
        const {activateIndex} = nextProps
        const content = this.lyricContent.current
        if (content) {
            const item = content.children[activateIndex]
            if (item) {
                const scroll = this.bscrollRef.scrollObj.scroll
                scroll.scrollToElement(item, 1000, 0, true)
            }
        }
    }
    // 点击切换模式
    handleMode = msg => {
        const {
            modeTypeArr, modeNum, getModeNum
        } = this.props
        if ((modeTypeArr.length - 1) === modeNum) {
            getModeNum(0)
        } else {
            getModeNum(modeNum+1)
        }
        this.setState({
            msg: msg
        }, () => {
            this.promptRef.handlePromptToggle()
        })
    }
    // 点击设置播放列表的状态
    handleListShow = (bol = false, num = 0) => {
        if (bol) {
            this.setState({
                isShow: bol
            }, () => {
                animation(this.playerList.current, {
                    opacity: num
                }, .8)
            })
        } else {
            animation(this.playerList.current, {
                opacity: num
            }, .8, () => {
                this.setState({
                    isShow: bol
                })
            })
        }
    }
    componentDidRecover = () => {
        this.getData(this.props.player, () => {})
    }
    render() {
        const {
            player,isPlay,progress,duration,
            currentTime,isPlayStatus,lyric,activateIndex,
            modeTypeArr, modeNum, getIsPlay
        } = this.props
        const {msg,isShow} = this.state
        return (
           <>
               <div className={'player'}>
                   {/*头部*/}
                   <header className={'player_navbar'}>
                       <i className={'iconfont icon-jiantouzuo'} onClick={() => this.props.history.goBack()}></i>
                       <div className="info">
                           <p>{player.name}</p>
                           <p>
                               <span>{player.al.name}</span>
                               <em>/</em>
                               <span>
                                {
                                    player.ar.map(item => <em key={item.id}>{item.name}</em>)
                                }
                            </span>
                           </p>
                       </div>
                   </header>
                   {/*图片旋转播放*/}
                   <section
                       className={'player_container'}
                       style={{display: !isPlayStatus ? 'block' : 'none'}}
                       ref={this.dishContent}
                   >
                       <div className={'dish'} onClick={() => this.handleDishToggle(this.dishContent.current,this.lyricMain.current)}>
                           <div className="needle">
                               <img src={needle} alt="needle" width={'100%'} height={'100%'} style={{transform: !isPlay ? 'scale(0.5)' : 'scale(0.5) rotate(-30deg)'}}/>
                           </div>
                           <div className="disc" style={{backgroundImage: `url(${disc})`,animationPlayState: !isPlay ? 'paused' : 'running'}}>
                               <div className="disc_cover">
                                   <img src={player.picUrl} alt={player.name}/>
                               </div>
                           </div>
                       </div>
                   </section>
                   {/*歌词播放*/}
                   <section
                       className={'lyric_wrap'}
                       style={{display: isPlayStatus ? 'block' : 'none'}}
                       onClick={() => this.handleDishToggle(this.lyricMain.current,this.dishContent.current)}
                       ref={this.lyricMain}
                   >
                       <MyBscroll ref={bscrollRef => this.bscrollRef = bscrollRef}>
                           <ul className={'list'} ref={this.lyricContent}>
                               {
                                   lyric.map((item,index) => <li key={index} className={index === activateIndex ? 'activate' : null}>{item.content}</li>)
                               }
                           </ul>
                       </MyBscroll>
                   </section>
                   {/* 操作 */}
                   <div className={'player_controls'}>
                       <div className="time">
                           <span>{transTime(currentTime)}</span>
                           <div className={'slidre'} onClick={this.handleClickSlide} ref={this.lineRef}>
                               <div className="bar" style={{width: progress}}>
                                   <div className="btn"></div>
                               </div>
                           </div>
                           <span>{transTime(duration)}</span>
                       </div>
                       <div className="operation">
                           <i
                               className={'iconfont ' + modeTypeArr[modeNum].icon}
                               onClick={() => this.handleMode(modeTypeArr[(modeNum + 1)===modeTypeArr.length ? 0 : (modeNum + 1)].msg)}
                           ></i>
                           <i className={'iconfont icon-zuobofang'} onClick={this.handleUp}></i>
                           <i
                               className={isPlay ? 'iconfont icon-bofang1' : 'iconfont icon-kaishi'}
                               onClick={this.handleTogglePlayer}
                               style={{fontSize: '.8rem'}}
                           ></i>
                           <i className={'iconfont icon-youbofang'} onClick={this.handleNext}></i>
                           <i className={'iconfont icon-liebiao'} onClick={() => this.handleListShow(true, 1)}></i>
                       </div>
                   </div>
               </div>
               <section
                   className={'player_list'}
                   style={{display: isShow ? 'block' : 'none'}}
                   ref={this.playerList}
                   onClick={() => this.handleListShow(false,0)}
               >
                   <PlayerList handleListShow={this.handleListShow} getData={this.getData} handlePlay={() => {
                       getIsPlay(true)
                       this.handlePlay()
                   }}/>
               </section>
               <Prompt msg={msg} ref={promptRef => this.promptRef = promptRef}/>
           </>
        );
    }
}

export default connect(
    state => ({
        player: state.player,
        isPlay: state.isPlay,
        progress: state.progress,
        currentTime: state.currentTime,
        duration: state.duration,
        isPlayStatus: state.isPlayStatus,
        lyric: state.lyric,
        activateIndex: state.activateIndex,
        playerList: state.playerList,
        playerIndex: state.playerIndex,
        modeTypeArr: state.modeTypeArr,
        modeNum: state.modeNum
    }),
    {getIsPlay,getMenusData,getPlayStatus,getPlayLyric,getPlayerIndex,getModeNum}
)(Player);
