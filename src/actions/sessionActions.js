import * as types from '../_constants/actiontypes';

import {browserHistory} from 'react-router';
import auth from '../auth/authentcator'
export function loginUser(credentials) {
  return function(dispatch) {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    console.log(credentials)
    
      if(credentials.username  === "hruday@gmail.com" && credentials.password === "hruday123"){

        dispatch(setLoginSuccess(true));
        dispatch(setLoginPending(false));
        window.sessionStorage.setItem('userloggedin',true);
        browserHistory.push('/employeeslist')
        }

    else{
      dispatch(setLoginPending(false));
      dispatch(setLoginError("Invalid email and password"));
      browserHistory.push('/login')
    }
   
  };
}

function setLoginPending(isLoginPending) {
  return {
    type: types.SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess){
  return {
    type: types.SET_LOGIN_SUCCESS,
    isLoginSuccess
  }
}

function setLoginError(isLoginError){
  return {
    type: types.SET_LOGIN_ERROR,
    isLoginError
  }
}
export function logOutUser() {
  auth.logOut();
  return {type: types.LOG_OUT}
}

