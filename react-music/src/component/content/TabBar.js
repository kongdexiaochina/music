import React, {Component} from "react";
import { Tabs, WhiteSpace } from 'antd-mobile';
const  tabs = [
    {title: "推荐音乐"},
    {title: "热歌榜"},
    {title: "搜索"}
]
class TabBar extends Component {
    TabClick () {
        console.log(arguments)
    }
    render () {
        return (
            <div className={"tab_bar"}>
                <Tabs tabs={tabs}
                      initialPage={0}
                      // onChange={(tab, index) => { console.log('onChange', index, tab); }}
                      onTabClick={
                          this.TabClick.bind(this)
                      }
                      tabBarActiveTextColor={"rgb(212, 60, 51)"}
                >
                </Tabs>
                <WhiteSpace />
            </div>
        )
    }
}

export default TabBar
