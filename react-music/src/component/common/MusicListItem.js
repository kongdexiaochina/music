import React, {Component, Fragment} from 'react'
import { List } from 'antd-mobile';
const toTwo = num =>  num < 10 ? '0' + num : num
class MusicListItem extends Component {
    render() {
        const {item, index, isNum=false} = this.props
        return (
            <List.Item extra={
                <div className={"song_play"}>
                    <span></span>
                </div>
            } multipleLine={true}>
                {
                    isNum &&
                    <div className={index < 3 ? 'num on' : 'num'}>
                        {toTwo(index + 1)}
                    </div>
                }
                <div>
                    <h4 className={"song_title"}>{item.name}</h4>
                    <div className="song_detail">
                        <i></i>
                        {
                            item.song.artists.map((item, index) => {
                                if (index === 1 || index === 0) {
                                    return (
                                        <span key={index}>
                                            {item.name}
                                        </span>
                                    )
                                } else {
                                    return <Fragment key={index}></Fragment>
                                }
                            })
                        }
                        <em> - </em>
                        {item.song.name.name || item.song.name}
                    </div>
                </div>
            </List.Item>
        )
    }
}


export default  MusicListItem
