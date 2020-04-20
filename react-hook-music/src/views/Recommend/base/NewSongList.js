import React, {useEffect} from "react";
// 引入对应的路由内组件
import {NavLink} from 'react-router-dom'
// 引入适用性比较高的组件
import CommonNewSongListItem from '../../../component/common/NewSongListItem'
function NewSongList (props) {
    // 解构父组件传递过来的属性值
    const {newMusicList} = props
    return (
        <ul className={"newmusiclist"}>
            {
                newMusicList.map((item, index) => {
                    return (
                        <NavLink to={{pathname: '/player', params:{item:item}}} key={index}>
                            <CommonNewSongListItem item={item} index={false} className={""}/>
                        </NavLink>
                    )
                })
            }
        </ul>
    )
}

export default NewSongList
