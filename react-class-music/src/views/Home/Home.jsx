import React, { Component, Suspense,createRef } from 'react'
import {Redirect} from 'react-router-dom'
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import {secondRouter} from '../../router/index'
import animation from '../../utility/animation'
import stopBodyScroll from '../../utility/stopBodyScroll'
import Header from '../../component/common/Header'
import MenuShow from '../../component/common/MenuShow'
import ScrollHeader from '../../component/common/ScrollHeader'
import Loading from '../../component/content/Loading'


export default class Home extends Component {
    constructor (props) {
        super(props)
        // ref标记menu内容区域节点
        this.menuRef = createRef()
    }
    state = {
        isMenuShow: false, // 是否显示导航栏的内容
    }
    componentDidMount () {
        // 当DOM加载完毕的时候初始设置他的left值（不能为0）是根据视口宽度决定的widow.innerWidth
        this.menuRef.current.style.left = -window.innerWidth + 'px'
    }
    // 点击显示menu的内容
    menuShow = () => {
        this.setState({
            isMenuShow: true
        })
        animation(this.menuRef.current, {
            left: 0,
            opacity: 1
        }, 0.3)
        stopBodyScroll(true)
    }
    // 点击隐藏menu的内容
    menuHide = () => {
        animation(this.menuRef.current, {
            left: -window.innerWidth,
            opacity: 0
        }, 0.3, () => {
            this.setState({
                isMenuShow: false
            })
        })
        stopBodyScroll(false)
    }
    handleToggle  = index => {
        console.log(index)
    }
    render() {
        const {isMenuShow} = this.state
        return (
            <div className={'home'}>
                <ScrollHeader height={50}>
                    <Header menuShow={this.menuShow} handleToggle={this.handleToggle}/>
                </ScrollHeader>
                {/* 二级路由 */}
                <Suspense fallback={<Loading />}>
                    <CacheSwitch>
                        {
                            secondRouter.map(item => {
                                if (item.exact) {
                                    return <CacheRoute
                                        key={item.path}
                                        path={item.path}
                                        component={item.component}
                                        exact={item.exact}
                                        // 一些是路由缓存插件的一些配置
                                        when="always"
                                        behavior={cached =>
                                            cached
                                                ? {
                                                    style: {
                                                        position: "absolute",
                                                        zIndex: -9999,
                                                        opacity: 0,
                                                        visibility: "hidden",
                                                        pointerEvents: "none"
                                                    },
                                                    className: "__CacheRoute__wrapper__cached"
                                                }
                                                : {
                                                    className: "__CacheRoute__wrapper__uncached"
                                                }
                                        }
                                        saveScrollPosition={true}
                                    />
                                } else {
                                    return <CacheRoute
                                        key={item.path}
                                        path={item.path}
                                        component={item.component}
                                        // 一些是路由缓存插件的一些配置
                                        when="always"
                                        behavior={cached =>
                                            cached
                                                ? {
                                                    style: {
                                                        position: "absolute",
                                                        zIndex: -9999,
                                                        opacity: 0,
                                                        visibility: "hidden",
                                                        pointerEvents: "none"
                                                    },
                                                    className: "__CacheRoute__wrapper__cached"
                                                }
                                                : {
                                                    className: "__CacheRoute__wrapper__uncached"
                                                }
                                        }
                                        saveScrollPosition={true}
                                    />
                                }
                            })
                        }
                        <Redirect to="/home/discover"/>
                    </CacheSwitch>
                </Suspense>
                <div className="menu_mode_fake" onClick={this.menuHide} style={{display: isMenuShow ? 'block' : 'none'}} ref={this.menuRef} >
                    <MenuShow />
                </div>
            </div>
        )
    }
}

