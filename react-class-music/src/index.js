import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './static/iconfont/iconfont.css'
import './static/js/rem'
import './static/css/reset.css'
import './static/css/home.scss'
import './static/css/recommend.scss'
import './static/css/rank.scss'
import './static/css/songsheet.scss'
import './static/css/dj.scss'
import './static/css/search.scss'
import './static/css/common.scss'

import App from './App.jsx';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
