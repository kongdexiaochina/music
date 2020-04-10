import React from 'react'

function Banner (props) {
    // 解构父组件传递过来的属性值 并且 进行赋值 默认值
    const {description = '更新日期：4月9日'} = props
    return (
        <div className={"banner"}>
            <div className="banner_flex">
                <div className="banner_flex_icon"></div>
                <div className="banner_flex_time">{description}</div>
            </div>
        </div>
    );
}

export default Banner
