import React from "react";

function Icon (props) {
    // 解构父组件传递过来的属性值
    const {picUrl} = props
    return (
        <div className={"icon"}>
            <div className="needle"></div>
            <div className="icon_center">
                <div className="song_img">
                    <div className="rotate_img">
                        <img src={picUrl} alt="歌曲图片"/>
                    </div>
                </div>
            </div>
            <span className={"play_btn"}></span>
        </div>
    )
}

export default Icon
