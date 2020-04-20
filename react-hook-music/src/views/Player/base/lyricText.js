import React, {Fragment} from "react";
// 引入适用性比较高的组件
import CommonMyScroll from '../../../component/common/MyScroll'
function lyricText (props) {
    // 解构父组件传递过来的属性值
    const {title, song, lyric} = props
    // 需要滚动的内容
    const content = (
        <Fragment>
            {
                lyric.map((item, index) => {
                    return <p key={index} className={index === 0 ? 'on' : null}>{item.content}</p>
                })
            }
        </Fragment>
    )
    return (
        <div className={"lyric"}>
            <p className={"song_title"}>
                {title}
                <em> — </em>
                <Fragment>
                    {
                        song.artists.map((item, index) => {
                            return <Fragment key={index}>{item.name}</Fragment>
                        })
                    }
                </Fragment>
            </p>
            <div className="lrc_wrapper">
                <CommonMyScroll content={content} className={"wrapper_lyric"}/>
            </div>
        </div>
    )
}

export default lyricText
