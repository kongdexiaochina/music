import React, {Component, Fragment} from "react";
// 引入适用性比较低的组件
import ContentTopHeader from '../../component/content/TopHeader'
import ContentTabBar from '../../component/content/TabBar'
class Home extends Component{
    render () {
        return (
            <Fragment>
                <ContentTopHeader />
                <ContentTabBar />
            </Fragment>
        )
    }
}

export default Home
