import React from "react";

function TopHeader () {
    return (
        <div className={"home_top_flx"}>
            <img src={require('../../../images/logo.svg')} alt="log"/>
            <div className="home_top_flx_right">React.js</div>
        </div>
    )
}

export default TopHeader
