import React, {Component} from 'react'
import { Flex } from 'antd-mobile';
class TopHeader extends Component {
    render () {
        return (
            <Flex className={"top_header"}>
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
