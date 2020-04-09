import React, {Component, Fragment} from 'react'
import { List } from 'antd-mobile';
import CommentMusicListItem from '../../../component/common/MusicListItem'
class SongList extends Component {
    render() {
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
