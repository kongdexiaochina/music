import React, {Component} from 'react'

class GoBack extends Component{
    render() {
        return (
            <div className={"goback"} onClick={this.props.handleClick}>
                <h3>返回</h3>
            </div>
        );
    }
}

export default GoBack
