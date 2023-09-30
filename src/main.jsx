import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import MyRouter from "./config/routerConfig";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MyRouter />
  </Provider>
);
