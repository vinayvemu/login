import React from 'react';
import { Route, IndexRoute } from 'react-router';
import auth from './auth/authentcator';
import App from './App'
import LogInPage from '../src/LoginPage/LogInPage';
import employeeslist from '../src/HomePage/Homepage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LogInPage} />
    <Route path="/login" component={LogInPage} />
    <Route path="/employeeslist" component={employeeslist} onEnter={requireAuth} />
    
  </Route>
);
function requireAuth(nextState, replace) {
  if(!auth.loggedIn()) {
    replace({
      pathname: '/login',
    })
  }
}


