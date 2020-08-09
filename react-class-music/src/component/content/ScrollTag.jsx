import React, {Component} from 'react';

class ScrollTag extends Component {
    state = {
        tagIndex:  this.props.tagIndex || 0, // 记录初始点击了第几个标签
    }
    handleClickTag = (item, index) => {
        this.setState({
            tagIndex: index
        })
        this.props.handleChangeTag({...item, index})
    }
    render() {
        const {tagList} = this.props
        const {tagIndex} = this.state
        /*
        *   props 参数
        *       handleChangeTag：点击标签触发的事件处理函数(必须)
        *       tagList：数据源(必须)
        *       tagIndex：当前点击的index索引值(可选)
        * */
        return (
            <nav className="nav_list">
                <div className="nav_list_scroll">
                    {
                        tagList.map((item, index) => (
                            <section
                                className={index === tagIndex ? 'activate' : null}
                                key={index}
                                onClick={() => this.handleClickTag(item,index)}
                            >
                                <p>{item.name}</p>
                            </section>
                        ))
                    }
                </div>
            </nav>
        );
    }
}

export default ScrollTag;
