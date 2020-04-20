import React from "react";

function  SuccinctHead (props) {
    // 解构父组件传递过来的数据
    const {detailHead} = props
    return (
        <div className={"succinct_head"}>
            <div className={"succinct_head_bgc"} style={{backgroundImage: `url(${detailHead.urlImg})`}}></div>
            <div className="succinct_head_content">
                <div className="succinct_head_content_img">
                    <img src={detailHead.urlImg} alt=""/>
                    <span>歌单</span>
                </div>
                <div className="info">
                    <h3>{detailHead.name}</h3>
                </div>
            </div>
        </div>
    )
}

export default SuccinctHead
