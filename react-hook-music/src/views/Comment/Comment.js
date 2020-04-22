import React, {useEffect, useState} from "react";
// 引入react-redux和对应的actions
import {connect} from 'react-redux'
import {getIsMusic, getIsPlay} from '../../redux/actions'
// 引入对应的css样式
import '../../style/essayist.scss'
// 引入工具类函数
import {formateDate} from '../../utils/time'
// 引入对应的api请求函数
import {CommentData} from '../../api/comment'
// 引入适用性比较低的组件
import ContentLazyLoading from '../../component/content/LazyLoading'
import ContentLoading from '../../component/content/Loading'
// 引入适用性比较高的组件
import CommonGoBack from '../../component/common/GoBack'
import CommonMyScroll from '../../component/common/MyScroll'
function Comment (props) {
    // 解构对应的props
    const {location, getIsMusic, history, playerItemObj, getIsPlay} = props
    // 歌词数据
    const [hotComments, setHotComments] = useState([])
    // 获取数据
    const getData = async () => {
        const {hotComments} = await CommentData(playerItemObj.id)
        setHotComments(hotComments);
    }
    // 获取对应的数据
    useEffect(() => {
        getIsPlay(true) //播放音乐
        getData()
    }, [])
    // 监听路由变化是否显示迷你播放器
    useEffect(() => {
        getIsMusic(false)
        return function () { // 当组件销毁的时候 不显示迷你播放器
            getIsMusic(false)
        }
    }, [location])
    // 编导式导航
    const navigation = () => {
        history.go(-1)
    }
    // 需要滚动的区域
    const content = (
        <ul className={"list"}>
            {
                hotComments.map((item, index) => {
                    return (
                        <li key={index} className={"item"}>
                            <div className="img">
                                <ContentLazyLoading src={item.user.avatarUrl} loading={require("../../images/loadingLog.png")}/>
                            </div>
                            <div className="content">
                                <div className="header">
                                    <div className="info">
                                        <span className={"username"}>{item.user.nickname}</span>
                                        <span className={"time"}>{formateDate(item.time)}</span>
                                    </div>
                                    <div className="link">
                                        <span>{item.likedCount}</span>
                                        <i>
                                            <img src={require("../../images/like.svg")} alt=""/>
                                        </i>
                                    </div>
                                </div>
                                <div className="text">{item.content}</div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
    if (hotComments.length) {
        return (
            <div className={"comment"}>
                <div className="comment_bgc" style={{backgroundImage: `url(${playerItemObj.picUrl})`}}></div>
                <div className="flex">
                    <CommonGoBack className={"comment_goback"} navigation={navigation}/>
                    <h3>热门评论</h3>
                </div>
                <CommonMyScroll content={content} className={"wrapper_comment"}/>
            </div>
        )
    } else {
        return (
            <div className={"comment"}>
                <div className="comment_bgc" style={{backgroundImage: `url(${playerItemObj.picUrl})`}}></div>
                <ContentLoading />
            </div>
        )
    }
}

export default connect(
    state => ({
        playerItemObj: state.playerItemObj
    }),
    {
        getIsMusic:getIsMusic,
        getIsPlay: getIsPlay
    }
)(Comment)
