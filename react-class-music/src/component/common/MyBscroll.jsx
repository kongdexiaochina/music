import React, {Component} from 'react';
import Scroll from 'react-bscroll'
import 'react-bscroll/lib/react-scroll.css'
class MyBscroll extends Component {
    render() {
        return (
            <Scroll ref={scrollObj => this.scrollObj = scrollObj} click={true}>
                {this.props.children}
            </Scroll>
        );
    }
}

export default MyBscroll;
