import React, { Component, lazy, Suspense } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import Loading from './component/content/Loading'
// 路由懒加载
const Home = lazy(() => import("./views/Home/Home"))
const Search = lazy(() => import("./views/Search/Search"))
const Recommend = lazy(() => import("./views/Recommend/Recommend"))
const SongSheet = lazy(() => import("./views/SongSheet/SongSheet"))
const Rank = lazy(() => import("./views/Rank/Rank"))
const DJ = lazy(() => import("./views/DJ/DJ"))

class App extends Component {
  render() {
    return (
      // 一级路由
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path={'/home'} component={Home}/>
          <Route path={'/search'} component={Search}/>
          <Route path={'/recommend'} component={Recommend}/>
          <Route path={'/songsheet'} component={SongSheet}/>
          <Route path={'/rank'} component={Rank}/>
          <Route path={'/dj'} component={DJ}/>
          <Redirect to="/home/discover"/>
        </Switch>
      </Suspense>
    );
  }
}

export default App;
