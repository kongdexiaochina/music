import React, {Component} from 'react'
// 引入图片懒加载的插件
import Lazyload from "r-img-lazyload";
class ImgLoading extends Component{
    render() {
        // 我们使用图片懒加载的目的是缓解首屏加载的压力，优化用户体验
        // 图片懒加载的loading图片
        const loading = this.props.loading;
        // 配置图片懒加载
        const config = {
            // 其他配置项
            options: {
                // error: "errorPic", // 加载失败后展示的图像
                loading: loading, // 加载中展示的图像
                throttleWait: 1000 // 节流等待时间
            },
            // 图片地址
            src: this.props.src || ''
        };
        return (
            <Lazyload {...config}/>
        );
    }
}
export default ImgLoading
