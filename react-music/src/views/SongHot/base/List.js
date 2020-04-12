import React, {Component} from 'react'
// 引入对应的UI组件模块
import { List } from 'antd-mobile';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {getMusicData} from '../../../redux/actions'
// 引入适用性比较高的组件
import CommentMusicListItem from '../../../component/common/MusicListItem'
class SongList extends Component {
    // 我们在给组件DOM渲染完毕的时候 我们进行向redux当中发送数据
    componentDidMount() {
        this.props.getMusicData(this.props.tracks)
    }
    render() {
        // 解构父组件传递过来的属性值
        const {tracks} = this.props
        return (
            <List>
                {
                    tracks.map((item, index) => {
                        return (
                            <NavLink to={"/player/" + index} key={index}>
                                <CommentMusicListItem item={item} index={index} isNum={true}/>
                            </NavLink>
                        )
                    })
                }
            </List>
        )
    }
}

export default connect(
    null,
    {
        getMusicData: getMusicData
    }
)(SongList)
