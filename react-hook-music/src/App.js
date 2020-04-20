import React, {lazy, Suspense} from 'react';
// 引入对应的路由内置的组件
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
// 引入对应的css样式
import './style/app.scss';

// 路由懒加载
const Home = lazy(() => import('./views/Home/Home'));
const Detail = lazy(() => import("./views/Detail/Detail"))
const Player = lazy(() => import("./views/Player/Player"))
function App() {
  return (
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            {/*  一级路由*/}
            <Switch>
                <Route path={"/home"} component={Home}/>
                <Route path={"/detail"} component={Detail}/>
                <Route path={"/player"} component={Player}/>
                <Redirect to={"/home"}/>
            </Switch>
        </Suspense>
    </BrowserRouter>
  );
}

export default App;
