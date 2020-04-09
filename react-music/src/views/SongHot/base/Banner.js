import React from 'react'

function Banner (props) {
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
