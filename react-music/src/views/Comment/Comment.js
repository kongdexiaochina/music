import React, {Component, Fragment} from 'react'
// 引入connect用于解耦react+redux代码
import {connect} from 'react-redux'
// 引入适用性比较高的组件
import CommonGoBack from '../../component/common/GoBack'
// 引入对应的actions
import {getIsSmallMusic, getIsMusic} from '../../redux/actions'
// 引入对应的数据请求函数
import {CommentData} from '../../api/comment'
// 引入适用性比较高的组件
import CommonMyScroll from '../../component/common/MyScroll'
// 引入当前组件模块下面的子组件
import CommentPlayerList from './base/PlayerList'
class Comment extends Component {
    state = {
        hotComments: [] // 评论数据
    }
    componentWillMount() {
        this.getData() // 请求数据
        this.props.getIsSmallMusic(false) // 不显示迷你播放器
    }
    componentDidMount() {
        // 如果是开启播放那么我们就关闭
        if (this.props.is_Music) {
            this.props.getIsMusic(false) // 关闭播放
        }
    }
    // 请求数据的函数
    async getData () {
        const {music_obj: {id}} = this.props
        const {hotComments} = await CommentData(id)
        this.setState({
            hotComments
        })
    }
    // 编导式导航上一级历史路径
    handleClick = () => {
        const {history} = this.props
        history.go(-1)
    }
    render() {
        const {music_obj} = this.props
        const {hotComments} = this.state
        return (
            <Fragment>
                {
                    hotComments.length &&
                    <div className={"comment"}>
                        <div className="comment_bgc" style={{backgroundImage: `url(${music_obj.picUrl})`}}></div>
                        <div className={"comment_top"}>
                            <CommonGoBack handleClick={this.handleClick}/>
                            <p>热门评论</p>
                        </div>
                        <CommonMyScroll content={<CommentPlayerList hotComments={hotComments}/>} className={"comment_wrapper"}/>
                    </div>
                }
            </Fragment>
        )
    }
    // 在此处完成组件的卸载和数据的销毁。并且不显示迷你播放器 并且开启音乐
    componentWillUnmount (){
        this.props.getIsMusic(true) // 开启音乐
    }
}


export default connect(
    state => ({
        is_Music: state.is_Music,
        music_obj: state.music_obj
    }),
    {
        getIsSmallMusic: getIsSmallMusic,
        getIsMusic: getIsMusic
    }
)(Comment)
