import React, {Component} from 'react'
import { SearchBar } from 'antd-mobile';
class SearchMusic extends Component {
    onChange= (value) => {
        this.setState({ value });
    }
    render() {
        return (
            <div className={"search_music"}>
                <SearchBar
                    placeholder="搜索歌曲、歌手、专辑"
                    onSubmit={value => console.log(value, 'onSubmit')}
                    onClear={value => console.log(value, 'onClear')}
                    onFocus={() => console.log('onFocus')}
                    onBlur={() => console.log('onBlur')}
                    onCancel={() => console.log('onCancel')}
                    showCancelButton
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default SearchMusic
