import React, {Component, Fragment} from 'react'
// 引入对应的UI组件
import { Tag, List,  NoticeBar } from 'antd-mobile';

// 引入适用性比较高的组件
import CommonMusicListItem from '../../../component/common/MusicListItem'
import CommonMyScroll from '../../../component/common/MyScroll'
class HotList extends Component {
    render() {
        // 解构父级传递过来的方法和数据
        const {hots, handleClickTab, hotsList, val} = this.props
        //  需要BScroll插件滚动的区域
        const content = (
            <List>
                {
                    hotsList.map((item, index) => {
                        return (
                            <CommonMusicListItem key={index} item={item}/>
                        )
                    })
                }
            </List>
        )
        // 如果是空串或者是空格串 ，那就渲染一下的内容
        if (!val.replace(/(^\s*)|(\s*$)/g, '')) {
            return (
                <div className="hot_list">
                    <h3>热门搜索</h3>
                    <div className={"list"}>
                        {
                            hots.map((item, index) => {
                                return (
                                    <Tag key={index} onChange={() => {
                                        handleClickTab(item.first)
                                    }}>{item.first}</Tag>
                                )
                            })
                        }
                    </div>
                </div>
            )
        } else { // 反之渲染这里面的组件
            return (
                <Fragment>
                    {
                        hotsList.length ?
                            <CommonMyScroll content={content} className={"hotlist_wrapper"}/> :
                            <NoticeBar mode="closable" icon={null}>Did not get the song you are currently searching for</NoticeBar>
                    }
                </Fragment>
            )
        }
    }
}


export default HotList
