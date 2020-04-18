import React, {Fragment} from "react";

function NewSongListItem (props) {
    // 解构父组件传递过来的属性值
    const {item} = props
    return (
        <li className={"newmusiclist_item"}>
            <div className={"song_wrapper"}>
                <div className={"song_info"}>
                    <h5 className={"song_title"}>{item.name}</h5>
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
                        {item.song.name}
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
