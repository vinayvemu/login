import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import "./util.css"
import "./login.scss"

import alertify from 'alertifyjs';
import "./alertifystyling.scss"

import { loginUser } from '../actions/sessionActions';

import Cookies from 'universal-cookie';




class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     ischecked:false,
     issubmitclicked:false,
      credentials: {
        username: '',
        password: ''
      },
      createaccount:{
          Name:"",
          Email:"",
          Password:"",
          ConfirmPassword:""
      },
      errors: {},
      showStore: false,
      loading: false,
      showContactus: false,
      showResetpassword:false,

    }
   
  }

  componentDidMount() {
    let users =[];
    let existedUsers = JSON.parse(window.sessionStorage.getItem("userslist") || "[]")
    if(existedUsers.length<=1){
    users.push(this.state.createaccount);
    window.sessionStorage.setItem("userslist", JSON.stringify(users));
    }
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
    that.setState({ errors,issubmitclicked:true });
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      var credentials = {};
      credentials['username'] = that.state.credentials.username;
      credentials['password'] = that.state.credentials.password;
      console.log(credentials)
      that.props.actions.loginUser(credentials);
    }
}
  
  handleForgetpassword = (e) =>{
   
   let that =this;
   let userslist =JSON.parse(window.sessionStorage.getItem('userslist'))

  console.log(userslist)
    e.preventDefault();
    let errors = {};
    if (that.state.credentials.username.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
      errors.username = "Valid email is required: ex@abc.xyz";
    }
    that.setState({ errors,issubmitclicked:true  });
    const isValid = Object.keys(errors).length == 0;
    if (isValid) {
        let user = userslist.filter(x=>x.Email === that.state.credentials.username)
       if(user.length>0){
        alert("Your Password Is : "+ user[0].Password)
       }
       else{
        alertify.notify("Does not Find any account with that mail...Try Creating New Mail..", 'error', 5);
       }
     
    }
  }
  
  handlecreateaccountchange = (e)=>{
    
    let errors = Object.assign({}, this.state.errors);
    delete errors[e.target.name];
    this.setState({ errors });

    let field = e.target.name;
    let createaccount = this.state.createaccount;

    //assign username and password value to createaccount
    createaccount[field] = e.target.value;

    //set and return createaccount states
    return this.setState({ createaccount: createaccount });
  }
  handleChangeforgetdetails =(e) =>{
    let errors = Object.assign({}, this.state.errors);
    delete errors[e.target.name];
    this.setState({ errors });

    let field = e.target.name;
    let credentials = this.state.credentials;

    //assign username and password value to credentials
    credentials["username"] = e.target.value;

    //set and return credentials states
    return this.setState({ credentials: credentials }); 
  }
  handleChange = (e) => {
    if (!!this.state.errors[e.target.name]) {

      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({ errors });

      //set loading state
      this.setState({ loading: true });

      //get username and password
      let field = e.target.name;
      let credentials = this.state.credentials;

      //assign username and password value to credentials
      credentials[field] = e.target.value;

      //set and return credentials states
      return this.setState({ credentials: credentials });
    } else {
      //set loading state
      this.setState({ loading: true });

      //get username and password
      let field = e.target.name;
      let credentials = this.state.credentials;

      //assign username and password value to credentials
      credentials[field] = e.target.value;

      //set and return credentials states
      return this.setState({ credentials: credentials });
    }
  }
  setCookies =() => {
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
  showcontactus = () => {
    this.setState({
        issubmitclicked:false,
      showContactus: true
    })
  }
  showresetscreen =() =>{
    this.setState({
        issubmitclicked:false,
      showResetpassword: true
    })
  }
  
  cancelReset = () =>{
    this.setState({
      showResetpassword: false,
      showContactus: false,
    })
  }
  handlecreateEmail =(e)=> {
  let users = JSON.parse( window.sessionStorage.getItem("userslist") || "[]");
    console.log(users)
   let that = this;
    e.preventDefault();
    let errors = {};
    let createaccount = this.state.createaccount
    if (createaccount.Name === '') errors.Name = "Name can't be empty";
    if (createaccount.Email.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        errors.Email = "Valid email is required: ex@abc.xyz";
      }
   
    if (createaccount.Password === '') errors.Password = "Password can't be empty";
    if (createaccount.Password !== createaccount.ConfirmPassword) errors.ConfirmPassword = "Passwords doess not match";
     

    this.setState({ errors,issubmitclicked:true });
    const isValid = Object.keys(errors).length == 0;
   
    if (isValid) {
     
        let checkExistuser = users.filter(x=>x.Email == createaccount.Email )
        console.log(checkExistuser)
        if(checkExistuser.length == 0){
          
        users.push(createaccount)
        window.sessionStorage.setItem('userslist',JSON.stringify(users));
        alertify.notify("Yay..Account Created Succesfully", 'success', 5);
        setTimeout(function(){
            that.cancelcontactus();
          }, 5000);
        }
        else{
            alertify.notify("Email Id already exists..pleasetry with different Email", 'error', 5);
        }
  }
}
  cancelcontactus= () =>{
    let createaccount ={
      Name:"",
      Email:"",
      Password:"",
      ConfirmPassword:""   
     
  }
    this.setState({
      createaccount:createaccount,
      showResetpassword: false,
      showContactus: false,
    })
  }

  isremember = () =>{
    let ischecked = this.state.ischecked
    this.setState({
      ischecked:!ischecked
    })
  }

  render() {
   
    console.log(this.props)
    console.log(this.state)
    let { isLoginPending, isLoginSuccess, isLoginError } = this.props;
    let { showContactus,showResetpassword ,createaccount,issubmitclicked,credentials,errors} = this.state
    return (
      <div className="limiter">
        {showContactus == false && showResetpassword == false &&
          <div className="container-login100">
            <div className="wrap-login100">
              <form className={classnames('login100-form validate-form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
                <span className="login100-form-title">
                  Welcome
					</span>

                <div className={classnames('wrap-input100 validate-input', { "alert-validate": issubmitclicked && errors.username })}
                 data-validate ={errors.username}>
                  <input
                    className="input100"
                    type="text"
                    id="username"
                    name="username"
                  
                    onChange={this.handleChange}
                    placeholder="User name/Email"
                    value={credentials.username}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                </div>

                <div className={classnames('wrap-input100 validate-input', { "alert-validate": issubmitclicked && errors.password })} data-validate={errors.password}>
                  <input
                    className="input100"
                    type="password"
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={this.handleChange}
                    placeholder="Password" />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                </div>

                <div className="container-login100-form-btn login-submit">
                  <button
                    className={classnames('login100-form-btn', { 'btn-loading': isLoginPending })}
                  >
                    Login
						</button>
                </div>
                {isLoginPending && <div className="form-group footer row" style={{ textAlign: 'center' }}>
                  <label>Please wait...</label>
                </div>}
                <div className="text-center p-t-12 col-sm-12 col-xs-12 col-lg-12 col-md-12" >
                  <div className="am-checkbox">
                    <input id="remember" type="checkbox"  checked={this.state.ischecked} 
                           onClick={this.isremember}/>
                    <label htmlFor="remember"> <span className="txt2">Remember me</span></label>
                  </div>
                </div>
                <div className="text-center p-t-12">
                  <span className="txt1">
                    Forgot 
						</span><span className="txt1">    	</span>
                  <a  className="txt2 pointer-link" onClick={this.showresetscreen}>
                     Username / Password?
						</a>
                </div>

                <div className="text-center" style={{marginTop:"10%"}}>
                  <a className="txt2 pointer-link" onClick={this.showcontactus}>
                    Create your Account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                  </a>
                </div>
              </form>

            </div>
            <div className="panel-bottom"><span>Test Project @ SpiceBlue</span></div>

          </div>}
        {showContactus == true && showResetpassword == false &&
          <div className="container-login100">
            <div className="wrap-login100">
           
              <form className={classnames('login100-form validate-form', { loading: this.state.loading })} onSubmit={this.handlegetinTouch}>
                <span className="login100-form-title">
                  Create Email
				      </span>

                 <div className={classnames('wrap-input100 validate-input', { "alert-validate": issubmitclicked && errors.Name})}   data-validate={errors.Name}>
                  <input
                    className="input100"
                    type="text"
                    value={createaccount.Name}
                    name="Name"
                    onChange={this.handlecreateaccountchange}
                    placeholder="Name" />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  </span>
                </div>

                 <div className={classnames('wrap-input100 validate-input', { "alert-validate": issubmitclicked && errors.Email})}   data-validate={errors.Email}>
                  <input
                    className="input100"
                    type="email"
                    name="Email"
                    id="Email"
                    value={createaccount.Email}
                    onChange={this.handlecreateaccountchange}
                    placeholder="Email" />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                </div>

                 <div className={classnames('wrap-input100 validate-input', { "alert-validate": issubmitclicked && errors.Password })}   data-validate={errors.Password}>
                 <input
                    className="input100"
                    type="Password"
                    name="Password"
                    id="Password"
                    value={createaccount.Password}
                    onChange={this.handlecreateaccountchange}
                    placeholder="Password" />
                  <span className="symbol-input100">
                    <i className="fa fa-commenting-o" aria-hidden="true"></i>
                  </span>
                </div>
                <div className={classnames('wrap-input100 validate-input', { "alert-validate": issubmitclicked && errors.ConfirmPassword})}   data-validate={errors.ConfirmPassword}>
                 <input
                    className="input100"
                    type="Password"
                    name="ConfirmPassword"
                    id="ConfirmPassword"
                    value={createaccount.ConfirmPassword}
                    onChange={this.handlecreateaccountchange}
                    placeholder="Confirm Password" />
                  <span className="symbol-input100">
                    <i className="fa fa-commenting-o" aria-hidden="true"></i>
                  </span>
                </div>
                 <div className="login100-form-btnRow">
                <button 
                  className="login100-form-btn"
                  onClick={this.cancelcontactus}
                  style={{background:"#f7a01d"}}
                  >
                    <span>
                    cancel
                    </span>
                  </button>
                  <button 
                    className="login100-form-btn"
                    id="Check"
                    type="submit"
                    onClick={this.handlecreateEmail}>
                    <span>
                      Create Email
							<i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
              </form>
            </div>
            <div className="panel-bottom"><span>Test Project @ SpiceBlue</span></div>
          </div>
        }
        {showContactus == false && showResetpassword == true &&
        <div className="container-login100">
            
            <div className="wrap-login100">

             
              <form className={classnames('login100-form validate-form', { loading: this.state.loading })} onSubmit={this.handleForgetpassword}>
                <span className="login100-form-title">
                Forgot Password?
                  <p>You can reset your password here.</p>
				        </span>
                 <div className={classnames('wrap-input100 validate-input', { "alert-validate": issubmitclicked && credentials.username == "" })}   data-validate="Valid email is required: ex@abc.xyz">
                  <input
                    className="input100"
                    type="email"
                    id="email"
                    name="email"
                    onChange={this.handleChangeforgetdetails}
                    placeholder="Email"
                    value={this.state.credentials.username}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="login100-form-btnRow">
                <button 
                  className="login100-form-btn"
                  onClick={this.cancelReset}
                  style={{background:"#f7a01d"}}
                  >
                    <span>
                    cancel
                    </span>
                  </button>
                  <button 
                   id="Check"
                  className="login100-form-btn"
                  onClick={this.handleForgetpassword}
                  >
                    <span>
                    Get Password
                    </span>
                  </button>
                </div>
              </form>
            </div>
            <div className="panel-bottom"><span>Test Project @ SpiceBlue</span></div>
          </div>
        }
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
    actions: bindActionCreators({ loginUser }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
