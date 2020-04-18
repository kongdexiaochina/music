import React from "react";
// 引入对应的路由内置组件
import {NavLink} from 'react-router-dom'
function NavBar () {
    return (
        <ul className={"home_top_navbar"}>
            <li>
                <NavLink to={"/home/recommend"}>推荐音乐</NavLink>
            </li>
            <li>
                <NavLink to={"/home/hotsong"}>热歌榜</NavLink>
            </li>
            <li>
                <NavLink to={"/home/search"}>搜索</NavLink>
            </li>
        </ul>
    )
}

export default NavBar
