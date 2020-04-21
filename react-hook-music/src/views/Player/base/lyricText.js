import React, {Fragment, useCallback, useEffect, useRef} from "react";
// 引入react-redux
import {connect} from 'react-redux'
// 引入适用性比较高的组件
import CommonMyScroll from '../../../component/common/MyScroll'
function LyricText (props) {
    // 解构父组件传递过来的属性值
    const {title, song, lyric, currentTime} = props
    // 标记需要滚动的区域的ref节点
    const scroll = useRef(null)
    // 当currentTime值发送变化的时候根据歌词的time值计算出当前播放时间的index值
    const activateIndex = useCallback(() => {
        return lyric.findIndex((item, index, array) => {
            const nextLyric = array[index + 1]
            if (
                item.time <= currentTime &&
                (nextLyric ? currentTime < nextLyric.time : true)
            ) {
                return index
            } else {
                return  0
            }
        })
    }, [currentTime])
    // 当activateIndex的值发送变化的时候 进行滚动歌词
    useEffect(() => {
        if (scroll.current) {
            scroll.current.changeScroll(document.querySelectorAll("#item"), (activateIndex() === -1 ? 0 : activateIndex()))
        }
    }, [activateIndex()])
    // 需要滚动的内容
    const content = (
        <Fragment>
            {
                lyric.map((item, index) => {
                    return <p  id={"item"} key={index} className={index === (activateIndex() === -1 ? 0 : activateIndex()) ? 'on' : null}>{item.content}</p>
                })
            }
        </Fragment>
    )
    return (
        <div className={"lyric"}>
            <p className={"song_title"}>
                {title}
                <em> — </em>
                <Fragment>
                    {
                        song.artists.map((item, index) => {
                            return <Fragment key={index}>{item.name}</Fragment>
                        })
                    }
                </Fragment>
            </p>
            <div className="lrc_wrapper">
                <CommonMyScroll content={content} className={"wrapper_lyric"} scrollRef={scroll}/>
            </div>
        </div>
    )
}

export default connect(
    state => ({
        currentTime: state.currentTime
    }),
    null
)(LyricText)
