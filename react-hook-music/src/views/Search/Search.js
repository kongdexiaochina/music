import React, {useState, useEffect} from "react";
// 引入对应的请求数据的函数
import {hotListData} from '../../api/search'
// 引入对应的css文件
import '../../style/search.scss'
// 引入当中组件下面的子组件
import SearchQuerySong from './base/QuerySong'
import SearchSongList from './base/SongList'
function Search () {
    // 热门搜索的数据
    const [hots, setHots] = useState([])
    // 请求数据的函数
    const getData = async () => {
        const {result: {hots}} = await hotListData()
        setHots(hots);
    }
    // 请求数据
    useEffect(() => {
        getData()
    }, [])
    // console.log(val);
    if (hots.length) {
        return (
            <div className={"search"}>
                <SearchQuerySong />
                <SearchSongList hots={hots}/>
            </div>
        )
    } else {
        return  <div></div>
    }
}

export default Search
