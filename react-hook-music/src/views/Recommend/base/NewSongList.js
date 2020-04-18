import React from "react";
// 引入适用性比较高的组件
import CommonNewSongListItem from '../../../component/common/NewSongListItem'
function NewSongList (props) {
    // 解构父组件传递过来的属性值
    const {newMusicList} = props
    // console.log(newMusicList);
    return (
        <ul className={"newmusiclist"}>
            {
                newMusicList.map((item, index) => {
                    return <CommonNewSongListItem item={item} key={index} index={false}/>
                })
            }
        </ul>
    )
}

export default NewSongList
