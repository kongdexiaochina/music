import React, { Component, createRef } from 'react'
// 处理头部固定定位的时候 抖动问题的组件
// 启动fixed定位的时候 我们要有一个节点来进行防抖(设置高)，否则会有抖动的问题
export default class ScrollHeader extends Component {
    constructor (props) {
        super(props)
        // ref标记头部的节点
        this.headerRef = createRef()
        // ref标记头部节点的防抖层
        this.headerAntiShake = createRef()
    }
    componentDidMount () {
        window.addEventListener('scroll', this.setFixed)
    }
    // 设置头部是否可以为fixed定位进行展示
    setFixed = () => {
        /* 
            props参数
                height：固定防抖层的高度
        */
        const scrollTop = document.documentElement.scrollTop
        const headerDOM = this.headerRef.current
        if (scrollTop > 0) {
            this.headerAntiShake.current.style.height = this.props.height + 'px'
            headerDOM.classList.add('header_fixed')
        } else {
            headerDOM.classList.remove('header_fixed')
            this.headerAntiShake.current.style.height = null
        }
    }
    render() {
        return (
            <div ref={this.headerAntiShake}>
                <section className="" ref={this.headerRef}>
                    {this.props.children}
                </section>
            </div>
        )
    }
    // 组件销毁的时候清除定时器
    componentWillUnmount () {
        window.removeEventListener('scroll', this.setFixed)
    }
}
