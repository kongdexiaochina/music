import React, {Component, createRef} from 'react'
import BScroll from 'better-scroll'
class MyScroll extends Component {
    constructor() {
        super(...arguments);
        this.wrapper =  createRef()
    }
    state = {
        scroll: null
    }
    componentDidMount() {
        const scroll = new BScroll(this.wrapper.current, {
            click: true
        })
        this.setState({
            scroll
        })
    }
    render() {
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
