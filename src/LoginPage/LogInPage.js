import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './login.scss'
import Homepage from '../HomePage/Homepage'

import { loginUser } from '../actions/sessionActions';
// import Header from '../common/Header';
// import TextInput from '../common/TextInput';



class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      querystrings: [],
      credentials: {
        username: '',
        password: ''
      },
      errors: {},
      showStore: false,
      loading: false,
      servererror: ''
    }
    console.log(this.props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    if (!!this.state.errors[e.target.name]) {

      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({ errors });

      //set loading state
      this.setState({ loading: true });

      //get username and password
      const field = e.target.name;
      const credentials = this.state.credentials;

      //assign username and password value to credentials
      credentials[field] = e.target.value;

      //set and return credentials states
      return this.setState({ credentials: credentials });
    } else {
      //set loading state
      this.setState({ loading: true });

      //get username and password
      const field = e.target.name;
      const credentials = this.state.credentials;

      //assign username and password value to credentials
      credentials[field] = e.target.value;

      //set and return credentials states
      return this.setState({ credentials: credentials });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var that = this;

    let errors = {};
    if (this.state.credentials.username === '') errors.username = "Username can't be empty";
    if (this.state.credentials.password === '') errors.password = "Password can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      var credentials = {};
      credentials['username'] = this.state.credentials.username;
      credentials['password'] = this.state.credentials.password;
console.log(credentials)
      this.props.actions.loginUser(credentials);
    }
}
render() {
   
   
    let {isLoginPending, isLoginSuccess, isLoginError} = this.props;
    return (
      <div className=" limiter">
      <div className={classnames('login-wrapper', { "container-login100": !this.props.isLoginSuccess})}>
        {!this.props.isLoginSuccess &&<div className="login-container">
          <div id="login-wrap">
            <div className="panel panel-default">
              <div className="panel-heading"><span>Login to your Account</span></div>
              {isLoginError && <div className="alert alert-warning alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"></button>
                {isLoginError}
              </div>}
              <div className="panel-body">
                <form className={classnames('form-horizontal', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
                  <div className="login-form">
                    <div className="form-group xs-mb-20">
                      <div className="form-wrap">
                        <div className={classnames('field', { error: !!this.state.errors.username })}>
                          <input
                            name="username"
                            value={this.state.credentials.username}
                            onChange={this.handleChange}
                            placeholder="Email / Username"
                            autoComplete="off"
                            id="username"
                            className={classnames('form-control', { error: !!this.state.errors.username })} />
                          <span>{this.state.errors.username}</span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-wrap">
                        <div className={classnames('field', { error: !!this.state.errors.username })}>
                          <input
                            name="password"
                            value={this.state.credentials.password}
                            onChange={this.handleChange}
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            id="password"
                            className={classnames('form-control', { error: !!this.state.errors.password })} />
                          <span>{this.state.errors.password}</span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group login-submit">
                      <input
                        type="submit"
                        value="Submit"
                        disabled={isLoginPending}
                        className={classnames('btn-primary btn-lg',{'btn-loading':isLoginPending})}
                       />

                    </div>
                    {isLoginPending && <div className="form-group row" style={{textAlign: 'center'}}>
                      <label>Please wait...</label>
                    </div>}
                  </div>
                </form>
              </div>
            
            </div>
          </div>
        </div>}
        {this.props.isLoginSuccess && <Homepage/>}
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return state.sessionReducer;
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({loginUser}, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);

