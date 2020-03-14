import * as types from '../_constants/actiontypes';
import {browserHistory} from 'react-router';


  export default function sessionReducer(state = {
    isLoginSuccess: false,
    isLoginPending: false,
    isLoginError: null
  }, action) {

    switch(action.type) {
      case types.SET_LOGIN_PENDING:
        return Object.assign({}, state, {
          isLoginPending: action.isLoginPending
        });

      case types.SET_LOGIN_SUCCESS:
        return Object.assign({}, state, {
          isLoginSuccess: action.isLoginSuccess,
        });

      case types.SET_LOGIN_ERROR:
        return Object.assign({}, state, {
          isLoginError: action.isLoginError
        });

      case types.LOG_OUT:
        browserHistory.push('/')
       return ""

    default:
      return state;
  }
}
