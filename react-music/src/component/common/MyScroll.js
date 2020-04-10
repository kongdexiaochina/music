import React, {Component, createRef} from 'react'
import BScroll from 'better-scroll'
class MyScroll extends Component {
    constructor() {
        super(...arguments);
        this.wrapper =  createRef() // 创建一个标记节点
    }
    state = {
        scroll: null // 存储BScroll的一些方法的属性
    }
    // 当组件挂载完毕的时候 我们启动BScroll插件进行滚动 并且更改对应的状态
    componentDidMount() {
        const scroll = new BScroll(this.wrapper.current, {
            click: true
        })
        this.setState({
            scroll
        })
    }
    render() {
        // 解构父组件传递过来的属性值
        const {content, className} = this.props
        return (
            <div className={className} ref={this.wrapper}>
                <div className="content">
                    {content}
                </div>
            </div>
        )
    }
}


export default  MyScroll
