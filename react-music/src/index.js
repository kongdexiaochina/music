import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css';
import {Provider} from 'react-redux'
import App from './App'
import store from './redux/store'
import './style/reset.css'
import './style/recommend.scss'
import './style/songhot.scss'
import './style/public.scss'
import './style/search.scss'
import './style/detail.scss'
import './style/player.scss'
import './style/commen.scss'
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);
