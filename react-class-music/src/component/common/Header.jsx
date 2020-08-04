import React, { Component, Fragment } from 'react'
import {NavLink} from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <Fragment>
                <i className="iconfont icon-list"></i>
                <nav className="header_nav">
                    <NavLink to="/home/my">我的</NavLink>
                    <NavLink to="/home/discover">发现</NavLink>
                    <NavLink to="/home/video">视频</NavLink>
                </nav>
                <NavLink to="/search">
                    <i className="iconfont icon-search"></i>
                </NavLink>
            </Fragment>
        )
    }
}
