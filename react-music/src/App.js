import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
// 引入一级路由组件
import StairRouter from './router/StairRouter'
// 引入适用性比较高的组件
import CommonSmallPlayer from './component/common/SmallPlayer'
class App extends Component {
    render () {
        const {music_obj} = this.props
        return (
            <Fragment>
                <StairRouter />
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
