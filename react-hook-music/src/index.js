import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import {Provider} from 'react-redux'
import './style/reset.css'
import App from './App';
import './style/common.scss'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
