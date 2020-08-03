import React, { Component, lazy, Suspense } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Header from '../../component/common/Header'

// 路由懒加载
const Discover = lazy(() => import("../Discover/Discover"))
const My = lazy(() => import("../My/My"))
const Video = lazy(() => import("../Video/Video"))

export default class Home extends Component {
    render() {
        return (
            <div className={'home'}>
                <Header />
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

