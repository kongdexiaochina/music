import React, { Component, Fragment } from 'react';
import {getDjBanner,getDjRecommend,getDjProgram} from '../../api/index'
import SlideShow from '../../component/content/SlideShow'
import SlideShowLarge from '../../component/content/SlideShowLarge'
import BoutiqueSong from '../../component/content/BoutiqueSong'
import LazyLoading from '../../component/common/LazyLoading'
import ScrollHeader from '../../component/common/ScrollHeader'
import Loading from '../../component/content/Loading'
class DJ extends Component {
    state = {
        banner: [], // 轮播图数据
        rankingList: [], // 歌单排行榜数据
        programList: [] // 电台列表数据
    }
    // 同步去请求数据
    UNSAFE_componentWillMount () {
        this.getData()
    }
    async getData () {
        const resultBanner = await getDjBanner()
        const resultRankingList = await getDjRecommend()
        const resultProgram = await getDjProgram()
        this.setState({ // 改变状态并且处理数据
            banner: resultBanner.data.data.map(item => ({image:item.pic})),
            rankingList: resultRankingList.data.data.map(item => item.radios).reduce((a, b)=> a.concat(b)),
            programList: resultProgram.data.data.list
        })
    }
    render() {
        const {banner,rankingList,programList} = this.state
        if (banner.length) {
            return (
                <Fragment>
                    <div className="dj">
                        {/* 头部 */}
                        <ScrollHeader height={50}>
                            <header className="header">
                                <div className="header_left">
                                    <i className="iconfont icon-jiantouzuo" onClick={() => this.props.history.push('/')}></i>
                                    <p>电台</p>
                                </div>
                            </header>
                        </ScrollHeader>
                        {/* 轮播图 */}
                        <SlideShow
                            banner={banner}
                            customPaging={() => <span></span>}
                            className={"dj_slide"}
                            handleShowBanner={() => {
                                this.largeSlide.handleShowBanner()
                            }}
                        />
                        {/* 排行榜 */}
                        <section className="dj_song">
                            <h3>榜单排行</h3>
                            <BoutiqueSong recommend={rankingList}/>
                        </section>
                        {/* 电台列表 */}
                        <section className="dj_list">
                            {
                                programList.map((item,index) => (
                                    <div key={index} className="dj_list_item">
                                        <LazyLoading src={item.program.coverUrl}/>
                                        <div className="info">
                                            <p>{item.program.name}</p>
                                            <div className="info_user">
                                                <LazyLoading src={item.program.dj.avatarUrl}/>
                                                <p className="name">{item.program.dj.nickname}</p>
                                                <p className="hot">
                                                    <i className="iconfont icon-hot"></i>
                                                    {item.score}
                                                </p>
                                            </div>
                                        </div>
                                        <i className="iconfont icon-shipin"></i>
                                    </div>
                                ))
                            }
                        </section>
                    </div>
                    {/* 显示大图 */}
                    <SlideShowLarge
                        ref={largeSlide => this.largeSlide = largeSlide}>
                        <SlideShow banner={banner} className="slider_show_slide" customPaging={(index) => {
                            return  <div>{index+1}/{banner.length}</div>
                        }}/>
                    </SlideShowLarge>
                </Fragment>
            );
        } else {
            return <Loading />
        }
    }
}

export default DJ;
