import React, { Component, createRef } from 'react'
import SlideShow from './SlideShow'
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
        /*
            props参数：
                banner：显示大图轮播图的数据(必须)
                className：大图轮播图的类名(可选) 默认是slider_show_slide类名
            我们必须在父级的时候，通过ref标记节点的方式来调用的我们handleShowBanner方法来显示大图轮播图
        */
        const {banner,className = 'slider_show_slide'} = this.props
        return (
           <div  className="slider_show" onClick={this.handleHideBanner} ref={this.slideShowRef} style={{display: isBannerShow ? 'block' : 'none'}}>
                <SlideShow banner={banner} className={className} customPaging={(index) => {
                    return  <div>{index+1}/{banner.length}</div>
                }}/>
            </div>
        )
    }
}
