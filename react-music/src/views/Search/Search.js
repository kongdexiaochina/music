import React, {Component, Fragment} from "react";
import {hotListData} from '../../api/search'
import SearchMusic from './base/SearchMusic'
import SearchHotList from './base/HotList'
class Search extends Component{
    state = {
        hots: [] // 热门搜索数据
    }
    componentWillMount() {
        this.getData()
    }
    async getData () {
        const {result: {hots}} = await hotListData()
        this.setState({
            hots:hots
        })
        console.log(hots)
    }
    render() {
        const {hots} = this.state
        return (
            <Fragment>
                {
                    hots.length &&
                    <div className={"search"}>
                        <SearchMusic />
                        <SearchHotList hots={hots}/>
                    </div>
                }
            </Fragment>
        )
    }
}

export default Search
