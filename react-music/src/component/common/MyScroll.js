import React, {Component, createRef} from 'react'
import BScroll from 'better-scroll'
class MyScroll extends Component {
    constructor() {
        super(...arguments);
        this.wrapper =  createRef()
    }
    componentDidMount() {
        const scroll = new BScroll(this.wrapper.current, {
            click: true
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
