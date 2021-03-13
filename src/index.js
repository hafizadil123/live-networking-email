import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Link } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'font-awesome/css/font-awesome.min.css';


import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
     <nav className="navbar navbar-expand-lg" style={{backgroundColor:  'rgb(25,39,52)'}}>
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand text-white" href="#">Live Email Networking</a>
      </div>
      <Link className="btn btn-success my-2 my-sm-0" to="/login" >Let's Ticker</Link>
    </div>
  </nav>
    <App />
   <footer className="footer">
  <div className="text-center p-3 text-white" style={{backgroundColor: 'rgb(25,39,52)'}}>
    © 2021 Copyright: {' '}
    <a className="text-white" href="#">Aggnett.com</a>
  </div>
</footer>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
