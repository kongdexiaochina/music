import React, {Component} from 'react';
import {connect} from 'react-redux'
import Prompt from "../../component/content/Prompt";
import {getThemeName} from '../../store/action'
import localStorage from '../../utility/localStorage'
const {setLocalStorage} = localStorage
class Skin extends Component {
    state = {
        itemColor: {} // 当前切换的主题
    }
    // 颜色配置
    colorConfig = [
        {name: 'red', color: '#F56C6C', msg: '红色'},
        {name: 'blue', color: '#409EFF', msg: '蓝色'},
        {name: 'pink', color: '#FFC0CB', msg: '粉色'},
        {name: 'green', color: '#7FFFAA', msg: '绿色'},
        {name: 'black', color: '#000000', msg: '黑色'},
        {name: 'orange', color: '#FF8C00', msg: '橙色'},
        {name: 'purple', color: '#800080', msg: '紫色'},
        {name: 'gray', color: '#708090', msg: '灰色'},
        {name: 'coffee', color: '#D2691E', msg: '咖啡色'},
        {name: 'matcha', color: '#55862F', msg: '抹茶色'},
        {name: 'golden', color: '#FFD700', msg: '土豪金'},
        {name: 'pale', color: '#F8F8FF', msg: '苍白色'},
    ]
    // 点击切换主题颜色
    handleClick = item => {
        const {getThemeName} = this.props
        this.setState({
            itemColor: item
        }, () => {
            getThemeName(item)
            setLocalStorage('themeName', item)
            this.PromptRef.handlePromptToggle()
        })
    }
    render() {
        const {itemColor} = this.state
        return (
            <>
                <div className={'skin'}>
                    <header className={'header'}>
                        <div className="left">
                            <i className={'iconfont icon-jiantouzuo'} onClick={() => this.props.history.goBack()}></i>
                            <p>切换皮肤</p>
                        </div>
                    </header>
                    <section className={'skin_content'}>
                        {
                            this.colorConfig.map(item => (
                                <div className={'color'} key={item.name} onClick={() => this.handleClick(item)}>
                                    <div style={{backgroundColor: item.color}}></div>
                                    <p>{item.msg}</p>
                                </div>
                            ))
                        }
                    </section>
                </div>
                <Prompt msg={'切换到' + itemColor.msg + '主题'} ref={PromptRef => this.PromptRef = PromptRef}/>
            </>
        );
    }
}

export default connect(
    null,
    {getThemeName}
)(Skin);
