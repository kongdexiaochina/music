import React, {Component, Fragment} from "react";

import {BannerData} from '../../api/songhot'
import conformityData from '../../utils/conformity'
import CommonMyScroll from '../../component/common/MyScroll'
import SongHotBanner from './base/Banner'
import SongHotSongList from './base/List'
class SongHot extends Component {
    state = {
        description: '', // banner组件标题数据
        tracks: [] // 热歌榜列表数据
    }
    componentWillMount() {
        this.getBannerData()
    }
    async getBannerData () {
        const {playlist: {description, tracks}} = await BannerData(1)
        tracks.length = 25
        this.setState({
            description: description,
            tracks: conformityData(tracks)
        })
    }
    render() {
        const {description, tracks} = this.state
        const content = (
            <div className={"songhot"}>
                <SongHotBanner description={description}/>
                <SongHotSongList tracks={tracks}/>
            </div>
        )
        return (
            <Fragment>
                {
                    tracks.length &&
                    <CommonMyScroll content={content} className={"songhot_wrapper"}/>
                }
            </Fragment>
        )
    }
}

export default SongHot
