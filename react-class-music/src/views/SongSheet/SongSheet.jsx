import React, { Component } from 'react';
import {getSongHot, getSongHandpick} from '../../api/index'
import {NavLink} from 'react-router-dom'
import ScrollHeader from '../../component/common/ScrollHeader'
import RemoSongItem from '../../component/content/RemoSongItem'
import Loading from '../../component/content/Loading'
class SongSheet extends Component {
    state = {
        tagsHot: [], // 热门歌单类型
        tagIndex: 0, // 记录初始点击了第几个标签
        tag: {}, // 记录点击标签的类型内容
        handpickList: [] // 网友精选歌碟歌单数据
    }
    // 同步的去请求数据
    UNSAFE_componentWillMount () {
        this.getData() // 请求热门歌单分类的数据
    }
    // 请求数据的方法
    async getData () {
        const result = await getSongHot()
        this.setState({
            tagsHot: result.data.tags.map(item => ({name:item.name}))
        }, () => {
            this.setState({
                tag: this.state.tagsHot[0]
            })
            this.getSongHandpickData(this.state.tag.name)
        })
    }
    // 请求网友精选歌碟的歌单数据
    async getSongHandpickData (name) {
        const result = await getSongHandpick(39,name,'hot')
        this.setState({
            handpickList: result.data.playlists.map(item => ({ // 处理数据
                picUrl:item.coverImgUrl,
                id: item.id,
                name: item.name,
                playCount: item.playCount
            }))
        })
    }
    // 点击类型
    handleClickTag (item,index) {
        this.setState({
            tag: item,
            tagIndex: index
        })
        this.getSongHandpickData(item.name)
    }
    render() {
        const {tagsHot,tagIndex,handpickList} = this.state
        if (tagsHot.length) {
            return (
                <div className="songsheet">
                    <ScrollHeader height={90}>
                        <header className="header">
                            <section className="left">
                                <i className="iconfont icon-jiantouzuo" onClick={() => this.props.history.push('/')}></i>
                                <p>歌单广场</p>
                            </section>
                        </header>
                        <nav className="nav_list">
                            <div className="nav_list_scroll">
                                {
                                    tagsHot.map((item, index) => (
                                        <section 
                                            className={index === tagIndex ? 'activate' : null}  
                                            key={index} 
                                            onClick={() => this.handleClickTag(item,index)}
                                        >
                                            <p>{item.name}</p>
                                        </section>
                                    ))
                                }
                            </div>
                        </nav>
                    </ScrollHeader>
                    <section className="handpick_list">
                        {
                            handpickList.map((item, index) => (
                                <NavLink key={index} to={`/recommend?id=${item.id}&name=${item.name}`}>
                                    <RemoSongItem item={item} color={'#000'}/>
                                </NavLink>
                            ))
                        }
                    </section>
                </div>
            );
        } else {
            return <Loading />
        }
    }
}

export default SongSheet;
