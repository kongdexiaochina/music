import React, {Component, Fragment} from 'react'
// 引入对应的UI组件模块
import { List } from 'antd-mobile';
// 引入适用性比较高的组件
import CommentMusicListItem from '../../../component/common/MusicListItem'
class SongList extends Component {
    render() {
        // 解构父组件传递过来的属性值
        const {tracks} = this.props
        return (
            <List>
                {
                    tracks.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <CommentMusicListItem item={item} index={index} isNum={true}/>
                            </Fragment>
                        )
                    })
                }
            </List>
        )
    }
}

export default SongList
