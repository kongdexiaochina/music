import React, {Component, Fragment} from "react";
import {hotListData, hotSearchData} from '../../api/search'
import conformityData from '../../utils/conformity'
import SearchMusic from './base/SearchMusic'
import SearchHotList from './base/HotList'

class Search extends Component{
    state = {
        val: '', // 搜索框当中的内容
        hots: [], // 热门搜索数据
        hotsList: [] // 搜索数据
    }
    componentWillMount() {
        this.getDataHots()
    }
    async getDataHots () {
        const {result: {hots}} = await hotListData()
        this.setState({
            hots:hots
        })
    }
    async getHotListData (name) {
        const {result:songs} = await hotSearchData(name)
        this.setState({
            hotsList: conformityData(songs.songs)
        })
    }
    changeVal = val => {
        this.setState(({
            val
        }))
        // 是否是空串
        const isEmpty = val.replace(/(^\s*)|(\s*$)/g, '')
        if (isEmpty) {
            this.getHotListData(val)
        }
    }
    handleClickTab = name => {
        this.setState({
            val:name
        })
        this.getHotListData(name)
    }
    render() {
        const {hots, val, hotsList} = this.state
        return (
            <Fragment>
                {
                    hots.length &&
                    <div className={"search"}>
                        <SearchMusic changeVal={this.changeVal} val={val}/>
                        <SearchHotList hots={hots} handleClickTab={this.handleClickTab} hotsList={hotsList} val={val}/>
                    </div>
                }
            </Fragment>
        )
    }
    componentWillUnmount = () => {
        this.setState = (s)=>{
            return;
        };
    }
}

export default Search
