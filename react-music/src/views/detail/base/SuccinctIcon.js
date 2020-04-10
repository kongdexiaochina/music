import React, {Component} from 'react'

class SuccinctIcon extends Component {
    render() {
        // 解构父级传递过来的数据
        const {SuccinctIcon} = this.props
        return (
            <div className={"succinct_icon"}>
                <div className="succinct_icon_tabs">
                    标签：
                    {
                        SuccinctIcon.tags &&
                        SuccinctIcon.tags.map((item, index) => {
                            return <em key={index}>{item}</em>
                        })
                    }
                </div>
                <div className="text">
                    简介：<span>{SuccinctIcon.description}</span>
                </div>
            </div>
        )
    }
}

export default  SuccinctIcon
