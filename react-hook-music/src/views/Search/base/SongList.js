import React, {useEffect, useState} from "react";
// 引入pubsub-js 用于接收数据
import Pubsub from 'pubsub-js'
// 引入对应的数据请求函数
import {hotSearchData} from '../../../api/search'
// 引入对应的路由内组件
import {NavLink} from 'react-router-dom'
// 引入对应的工具类函数
import conformityData from "../../../utils/conformity";
// 引入适用性比较高的组件
import CommonNewSongListItem from '../../../component/common/NewSongListItem'
import CommonMyScroll from '../../../component/common/MyScroll'
function SongList (props) {
    // 解构父组件传递过来的属性值
    const {hots} = props
    //搜索歌曲的数据
    const [SongList, setSongList] = useState([])
    // 当点击tab的时候 我们进行获取数据和发送数据
    const handleChangeName = (name) => {
        Pubsub.publish('valName',name) // 发送
        getQueryData(name) // 获取数据
    }
    // 请求搜索歌曲的数据
    const getQueryData = async (name) => {
        const isEmpty = name.replace(/(^\s*)|(\s*$)/g, '')
        if (isEmpty) { // 如果name值不是空串 那么进行获取数据
            const {result: {songs}} = await hotSearchData(name)
            setSongList(conformityData(songs));
        }
    }
    // 进行接收兄弟组件传递过来的数据
    useEffect(() => {
        Pubsub.subscribe("SongList", (type, data) => {
            setSongList(data);
        });
    }, [])
    // 需要滚动的内容
    const content = (
        <ul className={"song_list"}>
            {
                SongList.map((item, index) => {
                    return (
                        <NavLink to={{pathname: '/player', params:{item:item}}} key={index}>
                            <CommonNewSongListItem item={item} index={false} className={""}/>
                        </NavLink>
                    )
                })
            }
        </ul>
    )
    if (SongList.length) {
        return <CommonMyScroll content={content} className={"search_wrapper"}/>
    } else {
        return (
            <div className={"song_list"}>
                <h3>热门搜索</h3>
                <ul className={"list"}>
                    {
                        hots.map((item, index) =>{
                            return (
                                <li key={index} onClick={
                                    () => handleChangeName(item.first)
                                }>{item.first}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default SongList
