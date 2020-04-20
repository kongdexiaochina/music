import React, {Fragment, useCallback} from "react";

function NewSongListItem (props) {
    // 解构父组件传递过来的属性值 item表示你传递过来的数据他是一个对象 index表示你的列表的序列号默认是false
    const {item, index, className} = props
    // 处理index值
    const indexNum = useCallback((index) => {
        return index < 10 ? '0' + index : index + ''
    }, [])
    return (
        <li className={"newmusiclist_item"}>
            <div className={"song_wrapper"}>
                {
                    index && <div className={className} style={{color: index <= 3 && className === 'on' ? 'red' : '#999999'}}>{indexNum(index)}</div>
                }
                <div className={"song_info"}>
                    <h5 className={"song_title"}>
                        {item.name}
                    </h5>
                    <div className={"song_detail"}>
                        <i></i>
                        {
                            item.song.artists.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <span> {item.name} </span>
                                    </Fragment>
                                )
                            })
                        }
                        <em> - </em>
                        { item.song.name.name || item.song.name}
                    </div>
                </div>
                <div className={"song_play"}>
                    <span></span>
                </div>
            </div>
        </li>
    )
}

export default NewSongListItem
