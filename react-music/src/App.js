import React, {Component, Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
// 引入对应的路由组件
import Home from './views/Home/Home'
import Detail from './views/detail/Detail'
class App extends Component {
  render () {
    return (
        <Fragment>
            {/*一级路由*/}
            <Switch>
                <Route path={"/home"} component={Home}/>
                <Route path={"/detail"} component={Detail}/>
                <Redirect to={"/home"}/>
            </Switch>
        </Fragment>
    )
  }
}

export default App;
