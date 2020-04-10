import React, {Component} from 'react'
// 引入对应的UI组件
import { SearchBar } from 'antd-mobile';

class SearchMusic extends Component {
    render() {
        // 解构父组件传递过来的属性值
        const {changeVal, val} = this.props
        return (
            <div className={"search_music"}>
                <SearchBar
                    value={val}
                    placeholder="搜索歌曲、歌手、专辑"
                    showCancelButton
                    onChange={changeVal}
                />
            </div>
        );
    }
}

export default SearchMusic
