import React, {Component} from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
// 引入一级路由的配置
import {stair} from './config'
class StairRouter extends Component{
    render() {
       return (
           /*一级路由*/
           <Switch>
               {
                   stair.map((item, index) => {
                       return <Route path={item.path} component={item.component} key={index}/>
                   })
               }
               <Redirect to={"/home"}/>
           </Switch>
       )

    }
}

export default StairRouter
