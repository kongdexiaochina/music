import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import {Provider} from 'react-redux'
import './style/reset.css'
import App from './App';
import './style/common.scss'
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
