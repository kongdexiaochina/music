import React, {Component} from 'react';
import {
    Player,
    ControlBar,
    PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
    ReplayControl, // 后退按钮
    ForwardControl,  // 前进按钮
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton, // 倍速播放选项
    VolumeMenuButton
} from 'video-react';
import 'video-react/dist/video-react.css'; // import css
import {geiVideoSrc,getVideoDetails,getVideoCommon} from '../../api/index'
import getExactTime from '../../utility/getExactTime'
import Loading from '../../component/content/Loading'
import LazyLoading from '../../component/common/LazyLoading'
import ScrollHeader from '../../component/common/ScrollHeader'
class VideoDetails extends Component {
    state = {
        details: {},
        common: []
    }
    UNSAFE_componentWillMount() {
        this.getData()
    }
    async getData () {
        const id = this.props.match.params.id
        const resultUrl = await geiVideoSrc(id)
        const resultDetails = await getVideoDetails(id)
        const resultCommon = await getVideoCommon(id)
        const obj = {...resultDetails.data.data,url:resultUrl.data.urls[0].url}
        this.setState({
            details: obj,
            common: resultCommon.data.comments
        })
    }
    render() {
        const {details, common} = this.state
        if (common.length) {
            console.log(common)
            return (
                <div className={'video_details'}>
                    <ScrollHeader height={50}>
                        <header className={'header'}>
                            <div className="text">
                                <i className={'iconfont icon-jiantouzuo'} onClick={() => this.props.history.goBack()}></i>
                                <h3>{details.title}</h3>
                            </div>
                        </header>
                    </ScrollHeader>
                    <Player poster={details.coverUrl}>
                        <source src={details.url} />
                        <ControlBar autoHide={false} disableDefaultControls={false}>
                            <ReplayControl seconds={10} order={1.1} />
                            <ForwardControl seconds={30} order={1.2} />
                            <PlayToggle />
                            <CurrentTimeDisplay order={4.1} />
                            <TimeDivider order={4.2} />
                            <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
                            <VolumeMenuButton />
                        </ControlBar>
                    </Player>
                    <ul className={'common'}>
                        {
                            common.map(item => (
                                <li key={item.commentId}>
                                    <LazyLoading src={item.user.avatarUrl}/>
                                    <div className="info">
                                        <p>
                                            <span>{item.user.nickname}:</span>
                                            {item.content}
                                        </p>
                                        <p>
                                            {getExactTime(item.time)}
                                        </p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            );
        } else {
            return <Loading />
        }
    }
}

export default VideoDetails;
