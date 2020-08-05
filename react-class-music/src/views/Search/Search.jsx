import React, { Component, Fragment } from 'react'
import {getSearchHot,getSearchSuggest,getSearchDetailList} from '../../api/index'
import total from '../../utility/total'
import localStorage from '../../utility/localStorage'
import ScrollHeader from '../../component/common/ScrollHeader'
import Prompt from '../../component/content/Prompt'
import Loading from '../../component/content/Loading'
import throttle from '../../utility/throttle'
const {setLocalStorage,getLocalStorage} = localStorage

export default class Search extends Component {
    state = {
        hotSearch: [], // 搜索热歌榜数据
        msg: '', // 提示框内容
        historyList: [], // 历史记录列表
        value: '',
        searchList: [], // 搜索列表
        keyword: '', // 当前搜索的keyword值
        searchDetailList: [] // 搜索详情内容列表
    }
    constructor (props) {
        super(props)
        // 从新赋值成函数节流的方法
        this.handleClick = throttle(this.handleClick, 2000)
    }
    // 同步第获取数据
    UNSAFE_componentWillMount () {
        this.getDataHot()
    }
    async getDataHot () { // 获取最火热搜索榜
        const result = await getSearchHot()
        this.setState({
            hotSearch:result.data.data,
            historyList: getLocalStorage('hot_history')
        })
    }
    // 点击歌曲列表的选项 并且进行函数节流
    handleClick (item) {
        setLocalStorage('hot_history', item.searchWord)
        this.setState({
            msg: '搜索成功'
        }, () => {
            this.promptRef.handlePromptToggle() // 调用消息提示组件的方法
        })
        this.searchItemClick(item.searchWord)
    }
    // 搜索歌曲
    handleChange = async (e) => {
        this.setState({
            value: e.target.value
        })
        if (!e.target.value.match(/^[ ]*$/)) {
            const result = await getSearchSuggest(e.target.value)
            this.setState({
                searchList: result.data.result.allMatch || []
            })
        }
    }
    // 点击搜索内容的区域
    async searchItemClick (keyword) {
        this.setState({
            keyword,
            value: ''
        })
        const result = await getSearchDetailList(keyword, 15)
        this.setState({
            searchDetailList: result.data.result.songs 
        })
    }
    render() {
        const {hotSearch,msg,historyList,value,searchList,keyword,searchDetailList} = this.state
        if (hotSearch.length) {
            return (
                <div className="search">
                    {/* 头部 */}
                    <ScrollHeader height={50}>
                        <header className="header">
                            <i className="iconfont icon-jiantouzuo" onClick={() => this.props.history.push('/')}></i>
                            <div className="search">
                                <input 
                                    type="text"
                                    placeholder="搜索"
                                    value={value}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <i className="iconfont icon-iconset0203"></i>
                        </header>
                        {/* 搜索出来的内容列表 */}
                        <ul className="search_song_list" style={{display: value ? 'block' : 'none'}}>
                            {
                                searchList.map(item => (
                                    <li key={item.keyword} onClick={() => this.searchItemClick(item.keyword)}>
                                        <i className="iconfont icon-search"></i>
                                        <span>{item.keyword}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </ScrollHeader>
                    {
                        !keyword ?
                        <Fragment>
                            {/* 历史记录 */}
                            <section className="history">
                                <h3>历史记录</h3>
                                {
                                    !historyList.length ?
                                    <p className="not">暂无搜索记录...</p> :
                                    <Fragment>
                                        {
                                            historyList.map(item => <span key={item} className="tag" onClick={() => this.searchItemClick(item)}>{item}</span>)
                                        }
                                    </Fragment>
                                }
                            </section>
                            {/* 热搜榜 */}
                            <section className="most">
                                <h3>热搜榜</h3>
                                <ul className="most_list">
                                    {
                                        hotSearch.map((item,index) => (
                                            <li key={index} onClick={() => this.handleClick(item)}>
                                                <div className="info">
                                                    <span className={index <= 3 ? 'activateIndex order' : 'order'}>{total(index+1)}</span>
                                                    <div className="song">
                                                        <div className={index <= 3 ? 'activateTitle song_title' : 'song_title'}>
                                                            {item.searchWord}
                                                            {
                                                                item.iconUrl && <img src={item.iconUrl} alt="hot"/>
                                                            }
                                                        </div>
                                                        <p>{item.content}</p>
                                                    </div>
                                                </div>
                                                <span>{item.score}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </section>
                        </Fragment> :
                        <ul className="search_list">
                            {
                                searchDetailList.map((item,index) => (
                                    <li key={index}>
                                        <i className="iconfont icon-jiantouzuo" onClick={() => {this.setState({keyword: ''})}}></i>
                                        <div className="song">
                                            <p>{item.name}</p>
                                            <p>{item.artists[0].name} ~ {item.album.name}</p>
                                        </div>
                                        <i className="iconfont icon-bofang"></i>
                                    </li>
                                ))
                            }
                        </ul>
                    }
                    {/* 消息提示 */}
                    <Prompt msg={msg} ref={promptRef => this.promptRef = promptRef}/>
                </div>
            )
        } else {
            return <Loading />
        }
    }
}
