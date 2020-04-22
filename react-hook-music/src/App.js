import React from 'react';
// 引入对应的路由内置的组件
import {BrowserRouter} from 'react-router-dom'
// 引入react-redux
import {connect} from 'react-redux'
// 引入路由一级组件
import StairRouter from './router/StairRouter'
// 引入对应的css样式
import './style/app.scss';
import './style/content.scss'
// 引入对应适用性比较低的组件
import ContentSmallPlayer from './component/content/SmallPlayer'

function App(props) {
    // 解构props数据
    const {isMusic, playerItemObj} = props
    return (
        <BrowserRouter>
            <StairRouter />
            {
                Object.keys(playerItemObj).length &&
                <div style={{display: isMusic ? 'block' : 'none'}}>
                    <ContentSmallPlayer />
                </div>
            }
        </BrowserRouter>
    );
}

export default connect(
    state => ({
        isMusic: state.isMusic,
        playerItemObj: state.playerItemObj
    }),
    null
)(App);
