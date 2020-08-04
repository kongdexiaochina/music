import React, { Component, lazy, Suspense,createRef } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Header from '../../component/common/Header'

// 路由懒加载
const Discover = lazy(() => import("../Discover/Discover"))
const My = lazy(() => import("../My/My"))
const Video = lazy(() => import("../Video/Video"))

export default class Home extends Component {
    constructor (props) {
        super(props)
        // ref标记头部的节点
        this.headerRef = createRef()
        // ref标记头部节点的防抖层
        this.headerAntiShake = createRef()
    }
    componentDidMount () {
        window.addEventListener('scroll', this.setFixed)
    }
    // 设置头部是否可以为fixed定位进行展示
    setFixed = () => {
        const scrollTop = document.documentElement.scrollTop
        const headerDOM = this.headerRef.current
        if (scrollTop > 0) {
            this.headerAntiShake.current.style.height = '50px'
            headerDOM.classList.add('header_fixed')
        } else {
            headerDOM.classList.remove('header_fixed')
            this.headerAntiShake.current.style.height = null
        }
    }
    render() {
        return (
            <div className={'home'}>
                {/* 启动fixed定位的时候 我们要有一个节点来进行防抖，否则会有抖动的问题 */}
                <div ref={this.headerAntiShake}>
                    <header className="header" ref={this.headerRef}>
                        <Header/>
                    </header>
                </div>
                {/* 二级路由 */}
                <Suspense fallback={<div className="loading">loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={Discover}/>
                        <Route path="/home/discover" component={Discover}/>
                        <Route path="/home/my" component={My}/>
                        <Route path="/home/video" component={Video}/>
                        <Redirect to="/home/discover"/>
                    </Switch>
                </Suspense>
            </div>
        )
    }
}

