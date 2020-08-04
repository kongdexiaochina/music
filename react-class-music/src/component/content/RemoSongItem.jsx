import React from 'react'
import {numberFormat} from 'js-num-format'
import Lazyload from '../common/LazyLoading'

const RemoSongItem = props => {
    const {item,color} = props
    return (
        <div className="song_item" key={item.id}>
            <div className="info">
                <Lazyload src={item.picUrl}/>
                <p>
                    <i className="iconfont icon-bofangsanjiaoxing" style={{color}}></i>
                    <span>{numberFormat(item.playCount)}</span>
                </p>
            </div>
            <p>{item.name}</p>
        </div>
    )
}

export default RemoSongItem
