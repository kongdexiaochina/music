import React, {Component, Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './views/Home/Home'
class App extends Component {
  render () {
    return (
        <Fragment>
            {/*一级路由*/}
            <Switch>
                <Route path={"/home"} component={Home}/>
                <Redirect to={"/home"}/>
            </Switch>
        </Fragment>
    )
  }
}

export default App;
