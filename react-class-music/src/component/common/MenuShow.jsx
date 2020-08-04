import React, { Component } from 'react';
// 菜单内容
class MenuShow extends Component {
    render() {
        return (
            <div className="menu_show">
                <div className="drawer_sidebar_bgc"></div>
                <ul className="drawer_sidebar_list">
                    <li>
                        <p>皮肤中心</p>
                        <i className="iconfont icon-jiantou"></i>
                    </li>
                </ul>
            </div>
        );
    }
}

export default MenuShow;
