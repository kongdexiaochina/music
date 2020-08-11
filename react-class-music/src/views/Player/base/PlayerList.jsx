import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {getMenusData,getPlayerIndex} from '../../../store/action'
import MyBscroll from "../../../component/common/MyBscroll";
import LazyLoading from '../../../component/common/LazyLoading'
import localStorage from '../../../utility/localStorage'
const {setLocalStorage, getLocalStorage} = localStorage
class PlayerList extends Component {
    // 点击列表选项
    handleClick = (item,index) => {
        const {getMenusData,getPlayerIndex,getData,handlePlay} = this.props
        const init = getLocalStorage('hot_history') || []
        if (init.indexOf(item.name) === -1) {
            init.push(item.name)
            setLocalStorage('hot_history', init)
        }
        getMenusData(item)
        getPlayerIndex(index)
        getData(item, handlePlay)
        setLocalStorage('player',item)
        setLocalStorage('playerIndex', index)
        this.props.handleListShow(false,0)
    }
    render() {
        const {playerList,playerIndex} = this.props
        return (
            <section className={'content'}>
               <MyBscroll>
                   {
                       playerList.map((item,index) => (
                           <div key={item.id} onClick={() => this.handleClick(item,index)}>
                               <div className="left">
                                   <LazyLoading src={item.picUrl} />
                                   <div className="info">
                                       <p>{item.name}</p>
                                       <p>
                                           {item.al ? item.al.name : item.al} -
                                           {
                                               (item.ar || []).map(item => <Fragment key={item.id}>{item.name} </Fragment>)
                                           }
                                       </p>
                                   </div>
                               </div>
                               <i className={playerIndex === index ? 'iconfont icon-bofang1' : 'iconfont icon-kaishi'}></i>
                           </div>
                       ))
                   }
               </MyBscroll>
            </section>
        );
    }
}

export default connect(
    state => ({
        playerList: state.playerList,
        playerIndex: state.playerIndex
    }),
    {getMenusData,getPlayerIndex}
)(PlayerList);
