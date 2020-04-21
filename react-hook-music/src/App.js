import React, {lazy, Suspense} from 'react';
// 引入对应的路由内置的组件
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
// 引入react-redux
import {connect} from 'react-redux'
// 引入对应的css样式
import './style/app.scss';
import './style/content.scss'
// 引入对应适用性比较低的组件
import ContentSmallPlayer from './component/content/SmallPlayer'

// 路由懒加载
const Home = lazy(() => import('./views/Home/Home'));
const Detail = lazy(() => import("./views/Detail/Detail"))
const Player = lazy(() => import("./views/Player/Player"))
function App(props) {
    // 解构props数据
    const {isMusic, playerItemObj} = props
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                {/*  一级路由*/}
                <Switch>
                    <Route path={"/home"} component={Home}/>
                    <Route path={"/detail"} component={Detail}/>
                    <Route path={"/player"} component={Player}/>
                    <Redirect to={"/home"}/>
                </Switch>
            </Suspense>
            {
                Object.keys(playerItemObj).length &&
                <div style={{display: isMusic ? 'block' : 'none'}}>
                    <ContentSmallPlayer />
                </div>
            }
        </BrowserRouter>
    );
}

export default connect(
    state => ({
        isMusic: state.isMusic,
        playerItemObj: state.playerItemObj
    }),
    null
)(App);
