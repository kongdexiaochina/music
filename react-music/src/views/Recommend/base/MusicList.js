import React, {Component, Fragment} from 'react'
import { List } from 'antd-mobile';
// 引入适用性比较高的组件
import CommentMusicListItem from "../../../component/common/MusicListItem";
class MusicList extends Component {
    render() {
        const {newMusic} = this.props
        return (
            <Fragment>
                <h3 className={"title"}>最新音乐</h3>
                <List>
                    {
                        newMusic.map((item, index) => {
                            return (
                                <CommentMusicListItem key={index} item={item}/>
                            )
                        })
                    }
                </List>
            </Fragment>
        )
    }
}

export default MusicList