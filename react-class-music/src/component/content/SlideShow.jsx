import React, { Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default class SlideShow extends Component {
    render() {
        /*
            banner: 数据源(必须)
            className: 轮播图的类名，每一个轮播图都需要有一个className (可选)
            customPaging: 自定义分页 (必须)
            handleShowBanner: 可选，触发父级点击展示轮播图
        */
        const {banner,className,customPaging,handleShowBanner} = this.props
        // 轮播图选项
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            arrows: false
        };
        return  (
            <Slider {...settings} customPaging={customPaging} className={className}>
                {
                    banner.map((item,index) => <img src={item.image} alt="" key={index} onClick={handleShowBanner ? handleShowBanner : () => {}}/>)
                }
            </Slider>
        )
    }
}
