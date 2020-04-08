import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
// 引入对应的路由组件
import Home from '../views/Home/Home'
class IndexRouter extends Component {
    render() {
        return (
            <Switch>
                <Route to={"/home"} component={Home}></Route>
            </Switch>
        )
    }
}

export default IndexRouter
