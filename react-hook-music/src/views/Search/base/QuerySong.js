import React, {useState, useEffect} from "react";
// 引入pubsub-js 用于发送数据
import Pubsub from 'pubsub-js'
// 引入对应的api请求函数
import {hotSearchData} from '../../../api/search'
// 引入对应的工具类函数
import conformityData from "../../../utils/conformity";
function QuerySong () {
    // 搜索框的value值
    const [val, setVal] = useState('')
    // 请求搜索歌曲的数据
    const getQueryData = async (name) => {
        const isEmpty = name.replace(/(^\s*)|(\s*$)/g, '')
        if (isEmpty) {
            const {result: {songs}} = await hotSearchData(name)
            Pubsub.publish('SongList',conformityData(songs))
        }
    }
    // 当触发input框当中的change事件的时候触发该事件处理函数
    const handleChange = e => {
        const val = e.target.value
        setVal(val) // 设置对应的val值
        getQueryData(val) // 请求对应的数据
        if (!val) { // 如果val值为空那么我们就发送一个[]数组 代表没有获取到数据
            Pubsub.publish('SongList',[])
        }
    }
    // 删除
    const changeDelete = () => {
        setVal("") // 让val值为空
        Pubsub.publish('SongList',[]) // 发送一个空数组代表没有删除了所有的数据
    }
    // 当触发useEffect生命周期hook函数的时候 我们进行接收并且赋值数据也就是val值
    useEffect(() => {
        Pubsub.subscribe("valName", (type, data) => {
            setVal(data);
        });
    }, [])
    return (
        <div className={"querysong"}>
            <img src={require("../../../images/find.svg")} alt=""/>
            <div className="query">
                <input type="text" value={val} onChange={handleChange} placeholder={"搜索歌曲、歌手、专辑"}/>
            </div>
            <div className="icon" style={{display: val ? 'block' : 'none'}} onClick={changeDelete}>
                <img src={require("../../../images/detail.svg")} alt=""/>
            </div>
        </div>
    )
}

export default QuerySong
