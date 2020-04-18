import React from "react";
// 引入对应的路由内置组件
import {Switch, Route} from 'react-router-dom'
// 引入对应的路由组件
import Recommend from '../Recommend/Recommend'
import HotSong from "../HotSong/HotSong";
import Search from "../Search/Search";
// 引入对应的css文件
import '../../style/home.scss'
// 引入当前组件下面的子组件
import HomeTopHeader from './base/TopHeader'
import HomeNavBar from './base/NavBar'
function Home () {
    return (
        <div className={"home"}>
            <div className="home_top">
                <HomeTopHeader />
                <HomeNavBar />
            </div>
            {/*二级路由*/}
            <Switch>
                <Route path={"/home/recommend"} component={Recommend}/>
                <Route path={"/home/hotsong"} component={HotSong}/>
                <Route path={"/home/search"} component={Search}/>
            </Switch>
        </div>
    )
}

export default Home

