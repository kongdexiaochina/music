import React, {Component, Fragment} from 'react'
// 引入对应的UI组件
import { List } from 'antd-mobile';
// 引入工具类函数用于转换时间
import {formateDate} from '../../../utils/time'
class PlayerList extends Component{
    render() {
        const {hotComments} = this.props
        return (
            <Fragment>
                {
                    hotComments.map((item, index) => {
                        return (
                            <List renderFooter={
                                () => <div className={"content"}>{item.content}</div>
                            } key={index}>
                                <List.Item
                                    extra={
                                        <div className={"right"}>
                                            <span>{item.likedCount}</span>
                                            <i>
                                                <img src={require("../../../images/like.svg")} alt=""/>
                                            </i>
                                        </div>
                                    }
                                    thumb={item.user.avatarUrl}
                                    key={index}
                                >
                                    <div className={"content"}>
                                        <p className={"name"}>{item.user.nickname}</p>
                                        <p className={"time"}>{formateDate(item.time)}</p>
                                    </div>
                                </List.Item>
                            </List>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default PlayerList
