import React, {Component, Fragment, createRef} from 'react'
// 引入工具类函数用于整合歌词的数据
import lyricParser from '../../../utils/lyric'
import {connect} from 'react-redux'
import {getLyric} from '../../../redux/actions'
// 引入适用性比较高的组件
import CommonMyScroll from '../../../component/common/MyScroll'
class SongLyric extends Component {
    constructor(props) {
        super(...arguments);
        // Bscroll歌词的滚动标记对象
        this.lyricScroll = createRef()
        // 当前歌词滚动内容的标签对象
        this.content = createRef()
    }
    componentWillReceiveProps(nextProps) {
        // 解构nextProps当中的一些属性和方法
        const {getLyric, lyric, activate_index} = nextProps
        // 向redux当中发送当前的歌词 他是一个数组
        getLyric(lyricParser(lyric))
        const content = this.content.current
        if (content) {
            const item = content.children[activate_index]
            // 获取scroll
            const scroll = this.lyricScroll.current.state.scroll
            if (scroll) {
                // 进行歌词的滚动
                scroll.scrollToElement(item, 200, 0, true)
            }
        }
    }
    render() {
        // 解构父级传递过来的属性值
        const {titleObj, lyric, activate_index} = this.props
        // 需要滚动的区域
        const content = (
            <div ref={this.content}>
                {
                    lyricParser(lyric).map((item, index) => {
                        return <p key={index} className={index === activate_index ? 'on' : null}>{item.content}</p>
                    })
                }
            </div>
        )
        return (
            <Fragment>
                {
                    titleObj &&
                    <div className={"song_lyric"}>
                        <p className={"title"}>
                            {titleObj.name.name || titleObj.name}
                            <em> - </em>
                            <Fragment>
                                {
                                    titleObj.artists.map((item, index) => {
                                        return <Fragment key={index}>{item.name}</Fragment>
                                    })
                                }
                            </Fragment>
                        </p>
                        <CommonMyScroll content={content} className={"lyric_wrapper"} ref={this.lyricScroll}/>
                    </div>
                }
            </Fragment>
        )
    }
}

export default connect(
    state => ({
        time: state.time,
        activate_index: state.activate_index
    }),
    {getLyric: getLyric}
)(SongLyric)
