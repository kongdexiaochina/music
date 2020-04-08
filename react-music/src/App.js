import React, {Component, Fragment} from 'react';
// 引入对应的react路由
import IndexRouter from "./router/IndexRouter";
class App extends Component {
  render () {
    return (
        <Fragment>
          <IndexRouter />
        </Fragment>
    )
  }
}

export default App;
