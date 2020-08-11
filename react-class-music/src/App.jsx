import React, { Component, lazy, Suspense } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import SmallPlayer from './component/common/SmallPlayer'
import Loading from './component/content/Loading'
// 路由懒加载
const Home = lazy(() => import("./views/Home/Home"))
const Search = lazy(() => import("./views/Search/Search"))
const Recommend = lazy(() => import("./views/Recommend/Recommend"))
const SongSheet = lazy(() => import("./views/SongSheet/SongSheet"))
const Rank = lazy(() => import("./views/Rank/Rank"))
const DJ = lazy(() => import("./views/DJ/DJ"))
const VideoDetails = lazy(() => import("./views/VideoDetails/VideoDetails"))
const Player = lazy(() => import("./views/Player/Player"))
class App extends Component {
  render() {
    const {location,loginStatus} = this.props
    return (
      // 一级路由
      <Suspense fallback={<Loading />}>
        <section style={{paddingBottom: (location.pathname !== '/player' && Object.keys(loginStatus).length)? '41px' : '0'}}>
          <Switch>
            <Route path={'/home'} component={Home}/>
            <Route path={'/search'} component={Search}/>
            <Route path={'/recommend'} component={Recommend}/>
            <Route path={'/songsheet'} component={SongSheet}/>
            <Route path={'/rank'} component={Rank}/>
            <Route path={'/dj'} component={DJ}/>
            <Route path={'/videoDetails/:id'} component={VideoDetails}/>
            <Route path={'/player'} component={Player}/>
            <Redirect to="/home/discover"/>
          </Switch>
        </section>
        <SmallPlayer />
      </Suspense>
    );
  }
}

export default withRouter(connect(
    state => ({
      loginStatus: state.loginStatus
    })
)(App));
