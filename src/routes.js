import React from 'react';
import { Route, IndexRoute } from 'react-router';
import auth from './auth/authentcator';
import App from './App'
import LogInPage from '../src/LoginPage/LoginNew';
import Homepage from '../src/HomePage/Homepage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LogInPage} />
    <Route path="/login" component={LogInPage} />
    <Route path="/Homepage" component={Homepage} onEnter={requireAuth} />
    
  </Route>
);
function requireAuth(nextState, replace) {
  if(!auth.loggedIn()) {
    replace({
      pathname: '/login',
    })
  }
}


