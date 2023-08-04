import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyANqkkuZoJw_KlENaGe3l45G5vT8qEqVTY",
  authDomain: "reactlearning-blogapp.firebaseapp.com",
  projectId: "reactlearning-blogapp",
  storageBucket: "reactlearning-blogapp.appspot.com",
  messagingSenderId: "446721819128",
  appId: "1:446721819128:web:6e4ffd001bedc07052560d"
};
const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
