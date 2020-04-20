import React from "react";
// 引入react-redux和对应的actions
import {connect} from 'react-redux'
import {getIsPlay} from '../../../redux/actions'
function Icon (props) {
    // 解构父组件传递过来的属性值
    const {picUrl, isPlay, getIsPlay} = props
    return (
        <div className={"icon"}>
            <div className="needle"></div>
            <div className="icon_center">
                <div className="song_img">
                    <div className="rotate_img" style={{animationPlayState: isPlay ? 'inherit' : 'paused'}} onClick={
                        () => getIsPlay(false)
                    }>
                        <img src={picUrl} alt="歌曲图片"/>
                    </div>
                </div>
            </div>
            <span className={"play_btn"} onClick={
                () => getIsPlay(true)
            } style={{display: isPlay ? 'none' : 'block'}}></span>
        </div>
    )
}

export default connect(
    state => ({
        isPlay: state.isPlay
    }),
    {getIsPlay:getIsPlay}
)(Icon)
