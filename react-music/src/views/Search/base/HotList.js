import React, {Component} from 'react'
import { Tag, List } from 'antd-mobile';
import CommonMusicListItem from '../../../component/common/MusicListItem'
import CommonMyScroll from '../../../component/common/MyScroll'
class HotList extends Component {
    render() {
        const {hots, handleClickTab, hotsList, val} = this.props
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
        } else {
            return <CommonMyScroll content={content} className={"hotlist_wrapper"}/>
        }
    }
}


export default HotList
