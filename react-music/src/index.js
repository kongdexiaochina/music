import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css';
import App from './App';
import './style/reset.css'
import './style/recommend.scss'
import './style/songhot.scss'
import './style/public.scss'
import './style/search.scss'
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
  document.getElementById('root')
);
