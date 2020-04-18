import React from 'react';
// 引入对应的路由内置的组件
import {BrowserRouter, Switch, Route} from 'react-router-dom'
// 引入对应的路径组件
import Home from './views/Home/Home'
import './style/app.scss';

function App() {
  return (
    <BrowserRouter>
      {/*  一级路由*/}
      <Switch>
        <Route to={"/home"} component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
