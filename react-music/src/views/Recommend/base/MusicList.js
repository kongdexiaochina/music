import React, {Component, Fragment} from 'react'
// 引入对应的UI组件
import { List } from 'antd-mobile';
import {NavLink} from 'react-router-dom'
// 引入对应的actions
import {getMusicData} from '../../../redux/actions'
// 引入connect用于解耦react+redux代码
import {connect} from 'react-redux'
// 引入适用性比较高的组件
import CommentMusicListItem from "../../../component/common/MusicListItem";
class MusicList extends Component {
    // 我们在给组件DOM渲染完毕的时候 我们进行向redux当中发送数据
    componentDidMount() {
        this.props.getMusicData(this.props.newMusic)
    }
    render() {
        const {newMusic} = this.props
        return (
            <Fragment>
                <h3 className={"title"}>最新音乐</h3>
                <List>
                    {
                        newMusic.map((item, index) => {
                            return (
                                <NavLink to={"/player/" + index} key={index} className={"link"}>
                                    <CommentMusicListItem item={item}/>
                                </NavLink>
                            )
                        })
                    }
                </List>
            </Fragment>
        )
    }
}

export default connect(
    null,
    {getMusicData: getMusicData}
)(MusicList)
