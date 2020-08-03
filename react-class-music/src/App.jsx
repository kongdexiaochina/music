import React, { Component, lazy, Suspense } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

// 路由懒加载
const Home = lazy(() => import("./views/Home/Home"))
const Search = lazy(() => import("./views/Search/Search"))

class App extends Component {
  render() {
    return (
      // 一级路由
      <Suspense fallback={<div className="loading">loading...</div>}>
        <Switch>
          <Route path={'/home'} component={Home}/>
          <Route path={'/search'} component={Search}/>
          <Redirect to="/home/discover"/>
        </Switch>
      </Suspense>
    );
  }
}

export default App;