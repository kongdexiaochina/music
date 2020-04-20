import React from "react";

function GoBack (props) {
    // 解构父组件传递过来的属性值
    const {className, navigation} = props
    return (
        <div className={className} onClick={navigation}>
            <h3>返回</h3>
        </div>
    )
}

export default GoBack
