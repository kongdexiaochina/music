import React from "react";
// 引入对应的路由内组件
import {
    NavLink
} from 'react-router-dom'
// 引入适用性比较高的组件
import CommonNewSongListItem from '../../../component/common/NewSongListItem'
function SongList (props) {
    // 解构父组件传递过来的数据
    const {tracksList} = props
    return (
        <div className={"song_list"}>
            <h3>歌曲列表</h3>
            {
                tracksList.map((item, index) => {
                    return (
                        <NavLink to={{pathname: '/player', params:{item:item}}} key={index}>
                            <CommonNewSongListItem item={item} index={index + 1} className={"noDefault"}/>
                        </NavLink>
                    )
                })
            }
        </div>
    )
}

export default SongList
