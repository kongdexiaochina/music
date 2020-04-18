import React, {lazy, Suspense} from 'react';
// 引入对应的路由内置的组件
import {BrowserRouter, Switch, Route} from 'react-router-dom'
// 引入对应的css样式
import './style/app.scss';

// 路由懒加载
const Home = lazy(() => import('./views/Home/Home'));
function App() {
  return (
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            {/*  一级路由*/}
            <Switch>
                <Route to={"/home"} component={Home}/>
            </Switch>
        </Suspense>
    </BrowserRouter>
  );
}

export default App;
