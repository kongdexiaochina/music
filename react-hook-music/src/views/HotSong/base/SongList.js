import React from "react";
// 引入对应的路由内组件
import {NavLink} from 'react-router-dom'
// 引入适用性比较高的组件
import CommonNewSongListItem from '../../../component/common/NewSongListItem'
function SongList (props) {
    // 解构父级传递过来的数据
    const {tracks} = props
    return (
        <ul className={"list"}>
            {
                tracks.map((item, index) => {
                    return (
                        <NavLink to={{pathname: '/player', params:{item:item}}} key={index}>
                            <CommonNewSongListItem item={item} index={index + 1} className={"on"}/>
                        </NavLink>
                    )
                })
            }
        </ul>
    )
}

export default SongList
