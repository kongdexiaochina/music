import React from "react";

function SongList (props) {
    // 解构父组件传递过来的属性值
    const {songList} = props
    return (
        <div className={"song_list"}>
            {
                songList.map((item, index) => {
                    return (
                        <ul className={"song_list_line"} key={index}>
                            {
                                item.map((value, key) => {
                                    return (
                                        <li key={key} className={"item"}>
                                            <div className={"item_img"}>
                                                <img src={value.picUrl} alt={value.name}/>
                                                <span>
                                                    {String(value.playCount).slice(0,2)}万
                                                </span>
                                            </div>
                                            <p className={"name_text"}>{value.name}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default SongList
