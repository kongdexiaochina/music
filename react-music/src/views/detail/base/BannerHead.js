import React, {Component} from 'react'

class BannerHead extends Component {
    render() {
        // 解构父组件传递过来的属性值
        const {SongHead} = this.props
        return (
            <div className={"songhead"}>
                <div className="songhead_bgc" style={{backgroundImage: `url(${SongHead.urlImg})`}}></div>
                <div className="songheader_content">
                    <div className="songheader_content_img">
                        <img src={SongHead.urlImg} alt={SongHead.name}/>
                        <span className={"icon"}>歌单</span>
                    </div>
                    <div className="songheader_content_name">
                        <h3>{SongHead.name}</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default BannerHead
