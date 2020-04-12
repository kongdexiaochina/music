import React, {Component, Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
// 引入对应的路由组件
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail'
import Player from './views/Player/Player'
import Comment from './views/Comment/Comment'
// 引入适用性比较高的组件
import CommonSmallPlayer from './component/common/SmallPlayer'
class App extends Component {
    render () {
        const {music_obj} = this.props
        return (
            <Fragment>
                {/*一级路由*/}
                <Switch>
                    <Route path={"/home"} component={Home}/>
                    <Route path={"/detail"} component={Detail}/>
                    <Route path={"/player/:index"} component={Player}/>
                    <Route path={"/comment/:id"} component={Comment}/>
                    <Redirect to={"/home"}/>
                </Switch>
                {
                    Object.keys(music_obj).length &&
                    <CommonSmallPlayer />
                }
            </Fragment>
        )
    }
}

export default connect(
    state => ({
        music_obj: state.music_obj
    }),
    null
)(App)
