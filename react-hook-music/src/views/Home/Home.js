import React, {lazy, Suspense} from "react";
// 引入对应的路由内置组件
import {Switch, Route, Redirect} from 'react-router-dom'

// 引入对应的css文件
import '../../style/home.scss'
// 引入当前组件下面的子组件
import HomeTopHeader from './base/TopHeader'
import HomeNavBar from './base/NavBar'
// 路由懒加载
const Recommend = lazy(() => import('../Recommend/Recommend'))
const HotSong = lazy(() => import('../HotSong/HotSong'))
const Search = lazy(() => import('../Search/Search'))
function Home () {
    return (
        <div className={"home"}>
            <div className="home_top">
                <HomeTopHeader />
                <HomeNavBar />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                {/*二级路由*/}
                <Switch>
                    <Route path={"/home/recommend"} component={Recommend}/>
                    <Route path={"/home/hotsong"} component={HotSong}/>
                    <Route path={"/home/search"} component={Search}/>
                    <Redirect to={"/home/recommend"}/>
                </Switch>
            </Suspense>
        </div>
    )
}

export default Home

