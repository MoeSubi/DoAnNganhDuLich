import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// @ts-ignore
import { createStore } from 'redux';
import { Provider } from '../node_modules/react-redux/es/exports';
import mainReducer from './reducers/RootReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(mainReducer)
root.render(
  <Provider store={store}>

    <App />

  </Provider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
