import React, {Component, Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

// 引入对应的路由组件
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail'
import Player from './views/Player/Player'
// 引入适用性比较高的组件
import CommonSmallPlayer from './component/common/SmallPlayer'
class App extends Component {
    render () {
        return (
            <Fragment>
                {/*一级路由*/}
                <Switch>
                    <Route path={"/home"} component={Home}/>
                    <Route path={"/detail"} component={Detail}/>
                    <Route path={"/player/:index"} component={Player}/>
                    <Redirect to={"/home"}/>
                </Switch>
                <CommonSmallPlayer />
            </Fragment>
        )
    }
}

export default App
