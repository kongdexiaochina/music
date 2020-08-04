import React, {Component, Fragment, createRef} from 'react'
import {getBanner,getRecommendSong, getSong} from '../../api/index'
import animation from '../../utility/animation'
import SlideShow from '../../component/content/SlideShow'
import RemoSongItem from '../../component/content/RemoSongItem'
export default class Discover extends Component {
    constructor (props) {
        super(props)
        this.slideShowRef = createRef()
    }
    state = {
        banner: [], // 轮播图数据
        recommend: [], // 推荐歌单数据
        song: [], // 歌单数据
        isBannerShow: false // 是否显示大图轮播图
    }
    option = [ // 菜单选项
        {icon: 'iconfont icon-rili', title: '每日推荐'},
        {icon: 'iconfont icon-gedan', title: '歌单'},
        {icon: 'iconfont icon-paihangbang', title: '排行榜'},
        {icon: 'iconfont icon-diantai', title: '电台'}
    ]
    // 同步进行请求数据
    UNSAFE_componentWillMount () {
        this.getData()
        // 同步方法进行渲染菜单选项的解构
        this.optionDOM = (
            <ul className="discover_option">
                {
                    this.option.map(item => (
                        <li key={item.title}>
                            <div className="icon">
                                <i className={item.icon}></i>
                            </div>
                            <span>{item.title}</span>
                        </li>
                    ))
                }
            </ul>
        )
    }
    // 请求数据的方法
    async getData () {
        // 轮播图数据 
        const resultBanner = await getBanner(1) // 1代表请求轮播图的MV资源类型 1-->MV
        const banner = resultBanner.data.banners.map(item => ({image:item.pic})) // 处理轮播图的数据
        // 推荐歌单的数据
        const resultRecommend = await getRecommendSong(8)
        const recommend = resultRecommend.data.result.map(item => ({id:item.id,name:item.name,picUrl:item.picUrl,playCount:item.playCount}))
        // 歌单数据
        const resultSong = await getSong('华语', 'hot', 39)
        const song = resultSong.data.playlists.map(item => ({id:item.id,name:item.name,picUrl:item.coverImgUrl,playCount:item.playCount}))
        this.setState({
            banner,
            recommend,
            song
        })
    }
    // 点击显示展示轮播图
    handleShowBanner = (obj, index) => {
        // console.log(obj, index);
        this.setState({
            isBannerShow: true
        })
        animation(this.slideShowRef.current,{
            opacity:1,
        },0.25,function(){
            console.log('执行');
        })
    }
    // 点击关闭展示轮播图
    handleHideBanner = () => {
        animation(this.slideShowRef.current,{
            opacity:0,
        },0.3,() => {
            setTimeout(() => {
                this.setState({
                    isBannerShow: false
                })
            }, 300)
        })
    }
    render () {
        const {banner,recommend,song,isBannerShow} = this.state
        if (banner.length) {
            return (
                <Fragment>
                    <div className="discover">
                        <SlideShow banner={banner} customPaging={() => <span></span>} className={"home_slide"} handleShowBanner={this.handleShowBanner}/>
                        {this.optionDOM}
                        <section className="discover_song">
                            <header className="discover_song_head">
                                <h3>精品歌单</h3>
                                <p>查看更多</p>
                            </header>
                            <section className="discover_song_recommend">
                                {
                                    recommend.map(item => <RemoSongItem item={item} color={"#fff"} key={item.id}/>)
                                }
                            </section>
                        </section>
                        <section className="discover_song discover_song_every">
                            <header className="discover_song_head">
                                <h3>每日推荐歌单</h3>
                            </header>
                            <section className="song_every_list">
                                {
                                    song.map(item => <RemoSongItem item={item} color={"#000"} key={item.id}/>)
                                }
                            </section>
                        </section>
                    </div>
                    {/* 点击显示轮播大图的结构 */}
                    <div  className="slider_show" onClick={this.handleHideBanner} ref={this.slideShowRef} style={{display: isBannerShow ? 'block' : 'none'}}>
                        <SlideShow banner={banner} className={"slider_show_slide"} customPaging={(index) => {
                            return  <div>{index+1}/{banner.length}</div>
                        }}/>
                    </div>
                </Fragment>
            )
        } else {
            return <div className="loading">loading...</div>
        }
    }
}
