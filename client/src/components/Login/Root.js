import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Login from './Login';
import App from '../../App';
import Home from './Signup';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import Signup from './Signup';

function Root(props) {
  const [authLoading, setAuthLoading] = useState(true);

  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="Root">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Signup</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink> 
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink> 
            <NavLink activeClassName="active" to="#"   value="Logout"> <input type="button" onClick={handleLogout} value="Logout" /></NavLink> 
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Signup} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={App} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Root;
