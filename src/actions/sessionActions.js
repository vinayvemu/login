import * as types from '../_constants/actiontypes';

import {browserHistory} from 'react-router';
import auth from '../auth/authentcator'
import alertify from 'alertifyjs';
import "../LoginPage/alertifystyling.scss"


export function loginUser(credentials) {
  return function(dispatch) {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    console.log(credentials)

    let userslist =JSON.parse(window.sessionStorage.getItem('userslist'))

    let user = userslist.filter(x=>x.Email === credentials.username)
    if(user.length>0){
      if( user[0].Password == credentials.password){
    
        dispatch(setLoginSuccess(true));
        dispatch(setLoginPending(false));
        window.sessionStorage.setItem('userloggedin',true);
        window.sessionStorage.setItem("currentuser", credentials.username);
        let Allemails =[];
        let existedmails = JSON.parse(window.sessionStorage.getItem("Allemails") || "[]")
        Allemails = existedmails;
        console.log(Allemails)
        window.sessionStorage.setItem("Allemails", JSON.stringify(Allemails));
        browserHistory.push('/Homepage')
      }
      else{
        dispatch(setLoginPending(false));
        dispatch(setLoginSuccess(false));
        alertify.notify("Login failed Please check your Email/Password...", 'error', 5);
       }
    }
    else{
      alertify.notify("Does not Find any account with that mail...Try Creating New Mail..", 'error', 5);
 
      dispatch(setLoginPending(false));
      dispatch(setLoginSuccess(false));
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

