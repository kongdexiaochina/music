import React, { Component, createRef } from 'react'
import {NavLink} from 'react-router-dom'

export default class Header extends Component {
    constructor (props) {
        super(props)
        this.headerRef = createRef()
    }
    componentDidMount () {
        this.setHeaderColor(window.location.pathname)
    }
    componentDidUpdate () {
        this.setHeaderColor(window.location.pathname)
    }
    // 在不同场景下设置不同头部的颜色
    setHeaderColor (pathname) {
        const initPahtname = '/home/my' // 初始需要显示头部背景色的路径
        const dom = this.headerRef.current
        if (pathname === initPahtname) {
            dom.classList.add('dark')
        } else {
            dom.classList.remove('dark')
        }
    }
    render() {
        return (
            <header className="header" ref={this.headerRef}>
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
