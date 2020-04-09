import React, {Component, Fragment} from 'react'
import { Tag } from 'antd-mobile';
class HotList extends Component {
    render() {
        const {hots} = this.props
        console.log(hots)
        return (
            <Fragment>
                <div className="hot_list">
                    <h3>热门搜索</h3>
                    <div className={"list"}>
                        {
                            hots.map((item, index) => {
                                return (
                                    <Tag key={index} onChange={() => {
                                        console.log('onChange')
                                    }}>{item.first}</Tag>
                                )
                            })
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default HotList
