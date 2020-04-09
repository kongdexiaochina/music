import React, {Component} from 'react'
// 引入对应的UI组件
import { Flex } from 'antd-mobile';
class TopHeader extends Component {
    render () {
        return (
            <Flex className={"top_header"} justify={"between"}>
                <Flex.Item>
                    <img src={require("../../images/logo.svg")} alt="" className={"top_header_icon"}/>
                </Flex.Item>
                <Flex.Item>
                    <h1 className={"top_header_title"}>React.js</h1>
                </Flex.Item>
            </Flex>
        )
    }
}

export default TopHeader
