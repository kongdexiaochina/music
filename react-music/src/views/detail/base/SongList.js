import React, {Component} from 'react'
// 引入对应的UI组件
import {List} from 'antd-mobile'
// 引入工具类函数 用于整合数据
import conformityData from '../../../utils/conformity'
// 引入适用性比较高的组件
import CommonMusicListItem from '../../../component/common/MusicListItem'
class SongList extends Component {
    render() {
        // 解构父组件传递过来的属性值
        const {SongList} = this.props
        return (
            <div className={"song_list"}>
                <h3>歌曲列表</h3>
                <List>
                    {
                        conformityData(SongList).map((item, index) => {
                            return <CommonMusicListItem key={index} item={item} index={index} isNum={true}/>
                        })
                    }
                </List>
            </div>
        )
    }
}

export default SongList
