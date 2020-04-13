import React, {Component} from "react";
// 引入对应的actions
import {getMusicData} from '../../redux/actions'
// 引入connect用于解耦react+redux代码
import {connect} from 'react-redux'
// 引入对应的API数据请求函数
import {hotListData, hotSearchData} from '../../api/search'
import Loading from '../../router/loading/Loading'
// 引入工具类函数用于整合数据
import conformityData from '../../utils/conformity'
// 引入当前组件下面的子组件
import SearchMusic from './base/SearchMusic'
import SearchHotList from './base/HotList'

class Search extends Component{
    constructor(props) {
        super(props);
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }
    state = {
        val: '', // 搜索框当中的内容
        hots: [], // 热门搜索数据
        hotsList: [] // 搜索数据
    }
    // 当组件即将被挂载的是 进行获取数据
    componentWillMount() {
        this.getDataHots()
    }
    componentDidCatch = () => {
        this.props.getMusicData(this.state.hotsList)
    }
    componentDidRecover = () => {
        console.log('List recovered', '缓存回复')
        this.props.getMusicData(this.state.hotsList)
    }
    // 获取tab热歌歌曲数据
    async getDataHots () {
        const {result: {hots}} = await hotListData()
        this.setState({
            hots:hots
        })
    }
    // 获取对应的搜索歌曲的数据
    async getHotListData (name) {
        const {result} = await hotSearchData(name)
        if (result.songs) { // 获取到了数据
            this.setState({
                hotsList: conformityData(result.songs)
            })
        }
    }
    // 当我们在input输入文字的时候 如果不是空串或者是空格串，那么我们进行获取数据
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
    // 每点击歌曲tab标签的时候 进行获取数据
    handleClickTab = name => {
        this.setState({
            val:name
        })
        this.getHotListData(name)
    }
    render() {
        // 解构state状态管理里面的属性值
        const {hots, val, hotsList} = this.state
        if (hots.length) {
            return (
                <div className={"search"}>
                    <SearchMusic changeVal={this.changeVal} val={val}/>
                    <SearchHotList
                        hots={hots}
                        handleClickTab={this.handleClickTab}
                        hotsList={hotsList}
                        val={val}
                    />
                </div>
            )
        } else {
            return <Loading />
        }
    }
    //  当组件销毁的时候 我们要通过以下代码防止出现内存泄漏
    componentWillUnmount = () => {
        this.setState = (s)=>{
            return;
        };
    }
}

export default connect(
    null,
    {
        getMusicData: getMusicData
    }
)(Search)
