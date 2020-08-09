import React, { Component, createRef } from 'react'
import animation from '../../utility/animation'
import stopBodyScroll from '../../utility/stopBodyScroll'
export default class Prompt extends Component {
    constructor (props) {
        super(props)
        this.promptRef = createRef()
    }
    state = {
        isPrompt: false // 是否显示消息提示组件
    }
    // 点击触发提示组件的淡入淡出效果
    handlePromptToggle () {
        this.setState({
            isPrompt: true
        }, () => {
            stopBodyScroll(true)
            animation(this.promptRef.current, {
                opacity: 1
            }, .5, () => {
                animation(this.promptRef.current, {
                    opacity: 0
                }, .5, () => {
                    stopBodyScroll(false)
                    this.setState({
                        isPrompt: false
                    })
                })
            })
        })
    }
    render() {
        /*
            props参数
                msg：显示节点的内容/字符串或者是DOM节点(可选)
        */
        const {msg = ''} = this.props
        const {isPrompt} = this.state
        return (
            <div className="prompt" ref={this.promptRef} style={{display: isPrompt ? 'block' : 'none'}}>
                {msg}
            </div>
        )
    }
}
