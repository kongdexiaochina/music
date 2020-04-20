import React from "react";

function IconText (props) {
    // 解构父组件传递过来的属性值
    const {iconText: {tags, description}} = props
    return (
        <div className={"icontext"}>
            <div className="tags">
                标签：
                {
                    tags.map((item, index) => {
                        return <em key={index}>{item}</em>
                    })
                }
            </div>
            <div className="text">
                <span>简介：{description}</span>
            </div>
        </div>
    )
}

export default IconText
