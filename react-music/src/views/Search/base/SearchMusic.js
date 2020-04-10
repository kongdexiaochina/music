import React, {Component} from 'react'
import { SearchBar } from 'antd-mobile';

class SearchMusic extends Component {
    render() {
        const {changeVal, val} = this.props
        return (
            <div className={"search_music"}>
                <SearchBar
                    value={val}
                    placeholder="搜索歌曲、歌手、专辑"
                    onSubmit={value => console.log(value, 'onSubmit')}
                    onClear={value => console.log(value, 'onClear')}
                    onFocus={() => console.log('onFocus')}
                    onBlur={() => console.log('onBlur')}
                    onCancel={() => console.log('onCancel')}
                    showCancelButton
                    onChange={changeVal}
                />
            </div>
        );
    }
}

export default SearchMusic
