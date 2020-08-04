import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <i className="iconfont icon-list" onClick={this.props.menuShow}></i>
                <nav className="header_nav">
                    <NavLink to="/home/my">我的</NavLink>
                    <NavLink to="/home/discover">发现</NavLink>
                    <NavLink to="/home/video">视频</NavLink>
                </nav>
                <NavLink to="/search">
                    <i className="iconfont icon-search"></i>
                </NavLink>
            </header>
        )
    }
}
