import React from "react";
// 引入对应的css文件
import '../../style/home.scss'
// 引入对应的二级路由组件
import SecondRouter from '../../router/SecondRouter'
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
            <SecondRouter />
        </div>
    )
}

export default Home

