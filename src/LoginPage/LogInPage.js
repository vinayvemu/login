import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './login.scss'
import Cookies from 'universal-cookie';


import { loginUser } from '../actions/sessionActions';

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: '',
        password: ''
      },
      ischecked:false,
      errors: {},
      loading: false,
    }
 
  }


  handleChange = (e) => {
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
  componentDidMount() {
    this.setCookies();
  }
  
  handleSubmit = (e) =>{
    e.preventDefault();
    var that = this;
    const cookies = new Cookies();
    let credential= this.state.credentials
    if (that.state.ischecked) {
  
      cookies.set('username', credential.username);
      cookies.set('password', credential.password);
      cookies.set('remember', true);
    }
    else {
      // reset cookies
      cookies.set('username', null);
      cookies.set('password', null);
      cookies.set('remember', null);
    }
    let errors = {};
    if (that.state.credentials.username === '') errors.username = "Username can't be empty";
    if (that.state.credentials.password === '') errors.password = "Password can't be empty";
    that.setState({ errors });
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      var credentials = {};
      credentials['username'] = that.state.credentials.username;
      credentials['password'] = that.state.credentials.password;
      console.log(credentials)
      that.props.actions.loginUser(credentials);
    }
}
setCookies() {
  const cookies = new Cookies();
  var remember = cookies.get('remember');
  if (remember == 'true') {
    var username = cookies.get('username');
    var password = cookies.get('password');
 
    this.setState({
      ischecked:true,
      credentials: {
        username: username,
        password: password
      }
    })
  } else {
   
    this.setState({
      ischecked:false,
      credentials: {
        username: '',
        password: ''
      }
    })
  }
}

isremember = () =>{
  let ischecked = this.state.ischecked
  this.setState({
    ischecked:!ischecked
  })
}
render() {
  console.log(this.state)
    let {isLoginPending,  isLoginError} = this.props;
    return (
      <div className="login-wrapper">
      <div className="login-container">
        <div className="brand__logo"></div>
        <div id="login-wrap">
          <div className="panel panel-default">
            <div className="panel-heading"><span>Login to your Account</span></div>
            {isLoginError && <div className="alert alert-warning alert-dismissible" role="alert">
              {isLoginError}
            </div>}
            <div className="panel-body">
              <form className={classnames('form-horizontal', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
                <div className="login-form">
                  <div className="form-group xs-mb-20">
                    <div className="form-wrap">
                      <div className={classnames('field', { error: !!this.state.errors.username })}>
                        <input type="email" className="input-invisible" />
                        <input type="password" className="input-invisible" />
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
                      className={classnames('btn-primary btn-lg',{'btn-loading':isLoginPending})}
                     />
                  </div>
                  {isLoginPending && <div className="form-group footer row" style={{textAlign: 'center'}}>
                    <label>Please wait...</label>
                  </div>}
                  <div className="col-sm-6 col-xs-12">
                        <div className="am-checkbox">
                          <input id="remember" type="checkbox" checked={this.state.ischecked}  onClick={this.isremember}/>
                          <label htmlFor="remember">Remember me</label>
                        </div>
                      </div>
                  </div>
              </form>
            </div>
          </div>
        </div>
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

