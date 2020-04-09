import React, {Component} from 'react'

class Foot extends Component{
    render() {
        return (
            <div className={"foot"}>
                <div className="foot_wrapper">
                    <div className="foot_logo">
                        <img src={require("../../../images/foot.svg")} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Foot
