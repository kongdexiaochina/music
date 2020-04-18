import React from "react";

function Banner (props) {
    // 解构父组件传递过来的数据
    const {description} = props
    return (
        <div className={"banner"}>
            <div className="flex">
                <div className="icon"></div>
                <div className="time">{description}</div>
            </div>
        </div>
    )
}

export default Banner
