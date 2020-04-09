import React, {Component, Fragment} from 'react'
import { List } from 'antd-mobile';
class MusicListItem extends Component {
    render() {
        const {item} = this.props
        console.log(item)
        return (
            <List.Item extra={
                <div className={"song_play"}>
                    <span></span>
                </div>
            } multipleLine={true}>
                <h4 className={"song_title"}>{item.name}</h4>
                <div className="song_detail">
                    <i></i>
                    {
                        item.song.artists.map((item, index) => {
                            if (index === 1 || index === 0) {
                                return (
                                    <span key={index}>{item.name} - </span>
                                )
                            }
                        })
                    }
                    {item.song.name}
                </div>
            </List.Item>
        )
    }
}


export default  MusicListItem
