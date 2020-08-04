import React, { Component, lazy, Suspense,createRef } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import animation from '../../utility/animation'
import stopBodyScroll from '../../utility/stopBodyScroll'
import Header from '../../component/common/Header'
import MenuShow from '../../component/common/MenuShow'
import ScrollHeader from '../../component/common/ScrollHeader'
import Loading from '../../component/content/Loading'
// 路由懒加载
const Discover = lazy(() => import("../Discover/Discover"))
const My = lazy(() => import("../My/My"))
const Video = lazy(() => import("../Video/Video"))

export default class Home extends Component {
    constructor (props) {
        super(props)
        // ref标记menu内容区域节点
        this.menuRef = createRef()
    }
    state = {
        isMenuShow: false // 是否显示导航栏的内容
    }
    componentDidMount () {
        // 当DOM加载完毕的时候初始设置他的left值（不能为0）是根据视口宽度决定的widow.innerWidth
        this.menuRef.current.style.left = -window.innerWidth + 'px'
    }
    // 设置头部是否可以为fixed定位进行展示
    setFixed = () => {
        const scrollTop = document.documentElement.scrollTop
        const headerDOM = this.headerRef.current
        if (scrollTop > 0) {
            this.headerAntiShake.current.style.height = '50px'
            headerDOM.classList.add('header_fixed')
        } else {
            headerDOM.classList.remove('header_fixed')
            this.headerAntiShake.current.style.height = null
        }
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
    render() {
        const {isMenuShow} = this.state
        return (
            <div className={'home'}>
                <ScrollHeader height={50}>
                    <Header menuShow={this.menuShow}/>
                </ScrollHeader>
                {/* 二级路由 */}
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route exact path="/" component={Discover}/>
                        <Route path="/home/discover" component={Discover}/>
                        <Route path="/home/my" component={My}/>
                        <Route path="/home/video" component={Video}/>
                        <Redirect to="/home/discover"/>
                    </Switch>
                </Suspense>
                <div className="menu_mode_fake" onClick={this.menuHide} style={{display: isMenuShow ? 'block' : 'none'}} ref={this.menuRef} >
                    <MenuShow />
                </div>
            </div>
        )
    }
}

