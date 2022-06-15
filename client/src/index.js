import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index2.css';
import App from './App';
import Root from './components/Login/Root'
// import Login from './components/Login'

ReactDOM.render(
  <React.StrictMode>
     <Root/> 
    {/* <Login/> */}
  </React.StrictMode>,
  document.getElementById('root')
);
