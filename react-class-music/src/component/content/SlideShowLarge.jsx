import React, { Component, createRef } from 'react'
// import SlideShow from './SlideShow'
import animation from '../../utility/animation'
import stopBodyScroll from '../../utility/stopBodyScroll'

export default class SlideShowLarge extends Component {
    state = {
        isBannerShow: false // 是否显示大图轮播图
    }
    constructor (props) {
        super(props)
        // 标记大图轮播图
        this.slideShowRef = createRef()
    }
    // 点击显示展示轮播图
    handleShowBanner = () => {
        this.setState({
            isBannerShow: true
        })
        animation(this.slideShowRef.current,{
            opacity:1,
        },0.25,function(){
            stopBodyScroll(true)
        })
    }
    // 点击关闭展示轮播图
    handleHideBanner = () => {
        animation(this.slideShowRef.current,{
            opacity:0,
        },0.3,() => {
            setTimeout(() => {
                this.setState({
                    isBannerShow: false
                })
            }, 300)
        })
        stopBodyScroll(false)
    }
    render() {
        const {isBannerShow} = this.state
        return (
           <div  className="slider_show" onClick={this.handleHideBanner} ref={this.slideShowRef} style={{display: isBannerShow ? 'block' : 'none'}}>
               {this.props.children}
            </div>
        )
    }
}
