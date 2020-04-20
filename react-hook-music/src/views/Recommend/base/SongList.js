import React from "react";
// 引入对应的路径内置的组件
import {NavLink} from 'react-router-dom'
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
                                            <NavLink to={"/detail?id=" + value.id}>
                                                <div className={"item_img"}>
                                                    <img src={value.picUrl} alt={value.name}/>
                                                    <span>
                                                    {String(value.playCount).slice(0,2)}万
                                                </span>
                                                </div>
                                                <p className={"name_text"}>{value.name}</p>
                                            </NavLink>
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
