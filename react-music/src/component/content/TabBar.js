import React, {Component} from "react";
// 解构antd-mobileUI组件库当中的一些UI组件
import { Tabs } from 'antd-mobile';
// Tabs组件需要的一些数据
const  tabs = [
    {title: "推荐音乐", to: "/home/recommend"},
    {title: "热歌榜", to: "/home/sonhot"},
    {title: "搜索", to: "/home/search"}
]

class TabBar extends Component {
    render () {
        // 解构父组件传递过来的函数
        const {TabClick} = this.props
        return (
            <div className={"tab_bar"}>
                <Tabs tabs={tabs}
                      initialPage={0}
                      onChange={(tab) => {
                          TabClick(tab.to)
                      }}
                      tabBarActiveTextColor={"rgb(212, 60, 51)"}
                >
                </Tabs>
            </div>
        )
    }
}

export default TabBar
