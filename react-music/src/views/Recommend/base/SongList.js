import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
// 引入对应的UI组件
import { Card, WingBlank, WhiteSpace,  Flex } from 'antd-mobile';
// 引入工具类函数，把一维数组转换成二维数组
import ToArray from '../../../utils/ToArray'
class SongList extends Component {
    render () {
        // 解构props当中的数据
        const { songList } = this.props
        return (
           <Fragment>
               <h3 className={"title"}>推荐歌单</h3>
               <div className={"grid"}>
                   {
                       ToArray(3, songList).map((item, index) => {
                           return (
                               <div key={index} className={"list"}>
                                   <Flex>
                                       {
                                           item.map(value => {
                                               return (
                                                   <Link to={`/detail?id=${value.id}`} className={"item"} key={value.id}>
                                                       <WingBlank size="lg">
                                                           <WhiteSpace size="lg" />
                                                           <Card>
                                                               <Card.Header
                                                                   thumb={value.picUrl}
                                                                   extra={
                                                                       <Fragment>
                                                                           <span>{String(value.playCount).slice(0,2) + '万'}</span>
                                                                       </Fragment>
                                                                   }
                                                               />
                                                               <Card.Body>
                                                                   <div>{value.name}</div>
                                                               </Card.Body>
                                                           </Card>
                                                           <WhiteSpace size="lg" />
                                                       </WingBlank>
                                                   </Link>
                                               )
                                           })
                                       }
                                   </Flex>
                               </div>
                           )
                       })
                   }
               </div>
           </Fragment>
        )
    }
}

export default SongList
