import React from "react";
// 引入适用性比较高的组件
import CommonNewSongListItem from '../../../component/common/NewSongListItem'
function SongList (props) {
    // 解构父级传递过来的数据
    const {tracks} = props
    return (
        <ul className={"list"}>
            {
                tracks.map((item, index) => {
                    return <CommonNewSongListItem item={item} key={index} index={index + 1}/>
                })
            }
        </ul>
    )
}

export default SongList
