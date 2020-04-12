import React, {Component} from 'react'
// 引入connect用于对react+redux代码进行解耦
import {connect} from 'react-redux'
// 引入对应的action
import {getIsMusic} from '../../../redux/actions'
class IconMusic extends Component {
    render() {
        // 解构父组件传递过来的属性值
        const {url, getIsMusic, is_Music} = this.props
        return (
            <div className={"iconmusic"}>
                <div className="needle"></div>
                <div className="icon_center">
                    <div className="song_img">
                        <div className="song_img_rotate" onClick={
                            () => getIsMusic(false)
                        }
                             style={{animationPlayState: !is_Music ? 'paused' : 'inherit'}}
                        >
                            <img src={url} alt="歌曲图片"/>
                        </div>
                    </div>
                </div>
                {
                    !is_Music &&
                    <div className="play_btn" onClick={
                        () => getIsMusic(true)
                    }
                    ></div>
                }
            </div>
        )
    }
}


export default connect(
    state => ({
        is_Music: state.is_Music
    }),
    {getIsMusic: getIsMusic}
)(IconMusic)
