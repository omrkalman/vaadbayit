import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDedcqc3kajuCE9HJjisUzryz8lhKLs874",
  authDomain: "va-ad-bayit.firebaseapp.com",
  projectId: "va-ad-bayit",
  storageBucket: "va-ad-bayit.appspot.com",
  messagingSenderId: "678454354829",
  appId: "1:678454354829:web:75b9c144213ce3d99553c4",
  measurementId: "G-GVELKG9CWB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App auth={auth} />
  </Provider>
);
