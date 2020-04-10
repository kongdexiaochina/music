import React, {Component, Fragment} from 'react'
// 引入对应的UI组件
import { List } from 'antd-mobile';
// 把1这种形式的数字转换成01这种形式的数字
const toTwo = num =>  num < 10 ? '0' + num : num
class MusicListItem extends Component {
    render() {
        // 解构父级传递过来的属性值 item: 歌曲数据 index: 歌曲索引 isNum: 是否展示当前歌曲排名
        const {item, index, isNum=false} = this.props
        return (
            <List.Item extra={
                <div className={"song_play"}>
                    <span></span>
                </div>
            } multipleLine={true}>
                {
                    // 是否暂时当前歌曲排名
                    isNum &&
                    <div className={index < 3 ? 'num on' : 'num'}>
                        {toTwo(index + 1)}
                    </div>
                }
                <div className={"item"}>
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
