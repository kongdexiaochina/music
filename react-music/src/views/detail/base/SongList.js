import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
// 引入对应的UI组件
import {List} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMusicData} from '../../../redux/actions'
// 引入工具类函数 用于整合数据
import conformityData from '../../../utils/conformity'
// 引入适用性比较高的组件
import CommonMusicListItem from '../../../component/common/MusicListItem'
class SongList extends Component {
    // 我们在给组件DOM渲染完毕的时候 我们进行向redux当中发送数据
    componentDidMount() {
        this.props.getMusicData(conformityData(this.props.SongList))
    }
    render() {
        // 解构父组件传递过来的属性值
        const {SongList} = this.props
        return (
            <div className={"song_list"}>
                <h3>歌曲列表</h3>
                <List>
                    {
                        conformityData(SongList).map((item, index) => {
                            return (
                                <NavLink to={"/player/" + index} key={index}>
                                    <CommonMusicListItem item={item} index={index} isNum={true}/>
                                </NavLink>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}

export default connect(
    null,
    {
        getMusicData:getMusicData
    }
)(SongList)
