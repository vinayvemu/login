import React, { Component } from 'react';
import DefaultLayout from '../common/DefaultLayout'
import {browserHistory} from 'react-router';
import classnames from 'classnames';
import alertify from 'alertifyjs';
import "../LoginPage/alertifystyling.scss"




class UsersList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Allusers:[],
        createaccount:{
            Name:"",
            Email:"",
            Password:"",
            ConfirmPassword:"",
            isDeleted:false,
        },
        isUpdate:false,
        errors:{},
        showupdate:false,
        showdeletedusers:false,
        showuserslist:true,
        currentuser:""
    }
}

componentDidMount () {
   
    this.updatestate()
}
    
updatestate = () =>{
    let currentuser = window.sessionStorage.getItem("currentuser" || "")
    let Allusers = JSON.parse(window.sessionStorage.getItem("userslist"))
   
    this.setState({Allusers:Allusers,
        currentuser:currentuser,})
}


logout = () =>{
    sessionStorage.removeItem('userloggedin');
    alertify.notify("Logged Out successfully...", 'success', 5);
    window.location.reload();
}


onSubmit = () =>{
    
    let createaccount = this.state.createaccount;
    let Allusers = JSON.parse(window.sessionStorage.getItem("userslist" || []))
    let isValid = this.handlevalidation ();
    if(isValid){
  
    Allusers.push(createaccount)
    window.sessionStorage.setItem("userslist" , JSON.stringify(Allusers))
  
    this.setState({
        showupdate:false,
        showdeletedusers:false,
        showuserslist:true,
    })
    alertify.notify("User created successfully...", 'success', 5);
    this.updatestate();
    this.close();
    }
    

}

deleteSelecteduser = (item) =>{
      
    let user= Object.assign({},item);
    let Allusers = JSON.parse(window.sessionStorage.getItem("userslist" || []))

    let userid =user.Email
    const index = Allusers.map(e => e.Email).indexOf(userid);

    if(index != -1){
        user.isDeleted = true
        Allusers[index] =user
        alertify.notify("User Deleted Succesfully...", 'success', 5);
       
    }
    window.sessionStorage.setItem("userslist" , JSON.stringify(Allusers))
    this.setState({Allusers:Allusers,showuserslist:true,})
}

restoreUser =(item) =>{
    let user= Object.assign({},item);
    let Allusers = JSON.parse(window.sessionStorage.getItem("userslist" || []))

    let userid =user.Email
    const index = Allusers.map(e => e.Email).indexOf(userid);

    if(index != -1){
        user.isDeleted = false
        Allusers[index] =user
        alertify.notify("User Restored Succesfully...", 'success', 5);
       
    }
    window.sessionStorage.setItem("userslist" , JSON.stringify(Allusers))
    this.setState({Allusers:Allusers,})

}

onUpdateUser = () =>{
    
    let createaccount = this.state.createaccount;
    let Allusers = JSON.parse(window.sessionStorage.getItem("userslist" || []))
    let isValid = this.handlevalidation ();
    if(isValid){
    let userid =createaccount.Email
    const index = Allusers.map(e => e.Email).indexOf(userid);

    if(index != -1){
        Allusers[index] =createaccount
    }
   
    window.sessionStorage.setItem("userslist" , JSON.stringify(Allusers))
  
    this.setState({
        showupdate:false,
        showdeletedusers:false,
        showuserslist:true,
    })
    alertify.notify("User created successfully...", 'success', 5);
    this.updatestate();
    this.close();
    }
    
}
handlevalidation = () =>{
    let createaccount = this.state.createaccount;
    let errors = {};
    if (createaccount.Name === '') errors.Name = "Name can't be empty";
    if (createaccount.Email === '') errors.Email = "Email can't be empty";
    if (createaccount.Password== '') errors.Password = "Password can't be empty";
    if (createaccount.ConfirmPassword== '') errors.ConfirmPassword = "Please Enter password";
    this.setState({ errors});
    return  Object.keys(errors).length === 0;

}
close = () =>{
   let createaccount ={
        Name:"",
        Email:"",
        Password:"",
        ConfirmPassword:""
    };
    this.setState({
        showuserslist:true,
        createaccount:createaccount,
        showupdate:false
    })
}
openUpdateuser =() =>{
    this.setState({
        showupdate:true,
        showdeletedusers:false,
        showuserslist:false,
    })
}
openUserList = () =>{
    this.setState({
        showupdate:false,
        showdeletedusers:false,
        showuserslist:true,
    })
}
openDeletdUsers = () =>{
    this.setState({
        showupdate:false,
        showdeletedusers:true,
        showuserslist:false,
    })
}

onChange = (e)=>{
    
    let errors = Object.assign({}, this.state.errors);
    delete errors[e.target.name];
    this.setState({ errors });

    let field = e.target.name;
    let createaccount = this.state.createaccount;

    createaccount[field] = e.target.value;

    //set and return composenewmail states
    return this.setState({ createaccount: createaccount });
  }

  updateUser =(item) =>{
    
    let createaccount= Object.assign({},item);
    let updateUseraccount = Object.assign({},createaccount)
  
    this.setState({createaccount:updateUseraccount,isUpdate:true,})
    alertify.notify("User Updated Succesfully...", 'success', 5);
    this.openUpdateuser();
  }

  
switchApp = () =>{
    alertify.notify("Choose Your Application...", 'success', 5);
    browserHistory.push('/Chooseurapp')
}

render(){
console.log(this.state)

    let {createaccount,showupdate,currentuser, errors, showdeletedusers,
        showuserslist,Allusers,isUpdate}= this.state;
   let that = this;
    let allusers = Allusers.map(function(o,i){
        if(o.isDeleted == false && o.Name != ""){
            return(
                <tr key={i}>
                    <td> {o.Name}</td>
                    <td> {o.Email}</td>
                    <td> {o.Password}</td>
                    <td> <button
                     onClick={()=>that.deleteSelecteduser(o)}>Delete</button>
                     </td>
                    <td id="btn-row">
                    <button
                     onClick={()=>that.updateUser(o)}>Update</button>
                   
                   
                    </td>
                </tr>
            )
        }
    })
    let DeletedUsers= Allusers.map(function(o,i){
        if(o.isDeleted == true  && o.Name != ""){
            return(
                <tr key={i}>
                    <td> {o.Name}</td>
                    <td> {o.Email}</td>
                    <td> {o.Password}</td>
                    <td> {o.createddate}</td>
                    <td>
                    <button
                     onClick={()=>that.restoreUser(o)}>Restore</button>
                    </td>
                </tr>
            )
        }
    })

	
	return (
       
		<DefaultLayout>
            <div style={{textAlign:'center',color:"#fff"}}> <h2>{!showupdate ?(!showdeletedusers ?"All Users":"Deleted Users"):"Update/Create User"} </h2>
            <div id="main" class="clear">
            <div id="sidebar">
              
                <button className="compose" onClick = {this.openUpdateuser}>CreateUser</button>
                <button className="inbox" onClick = {this.openUserList}>All Users</button>
                <button className="sent" onClick = {this.openDeletdUsers}>Deleted Users</button>
                <button className="switch" onClick = {this.switchApp}>Switch App</button>
               
            </div>
        <div id="page-wrap">
        {showupdate &&
        <div className="composemail">
        <div className={classnames('wrap-input100 validate-input', { "alert-validate":errors.Name})}   data-validate={errors.Name}>
            <input
                className="mailinput"
                type="text"
                name="Name"
                value={createaccount.Name}
                onChange={this.onChange}
                placeholder="Name " />
                <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
           
            </div>
            <div className={classnames('wrap-input100 validate-input', { "alert-validate":errors.Email})}   data-validate={errors.Email}>
            <input
                className="mailinput"
                type="text"
                name="Email"
                value={createaccount.Email}
                onChange={this.onChange}
                placeholder="Email" />

            </div>
            <div className={classnames('wrap-input100 validate-input', { "alert-validate":errors.Password})}   data-validate={errors.Password}>
            <textarea
                className="mailinput"
                type="text"
                name="Password"
                value={createaccount.Password}
                onChange={this.onChange}
                placeholder="Password" />
                <span className="symbol-input100">
                <i className="fa fa-commenting-o" aria-hidden="true"></i>
                </span>
            </div>
            <div className={classnames('wrap-input100 validate-input', { "alert-validate":errors.ConfirmPassword})}   data-validate={errors.ConfirmPassword}>
            <textarea
                className="mailinput"
                type="text"
                name="ConfirmPassword"
                value={createaccount.ConfirmPassword}
                onChange={this.onChange}
                placeholder="ConfirmPassword" />
                <span className="symbol-input100">
                <i className="fa fa-commenting-o" aria-hidden="true"></i>
                </span>
            </div>
            <div className="btn-row">

                <button className="btn-primary" onClick={!isUpdate?this.onSubmit:this.onUpdateUser}>{isUpdate?"Update":"Submit"}</button>
                <button className="btn-cancel" onClick={this.close}>Cancel</button>
           </div>
            </div>
        }

        {!showupdate &&
        <table className="mailview" >
            <thead>
                <tr>
                    <th style={{color:'white', backgroundColor:'#4ecdc4',width:"15%"}}>UserName</th>
                    <th style={{color:'white', backgroundColor:'#4ecdc4',width:"35%"}}>Email</th>
                    <th style={{color:'white', backgroundColor:'#4ecdc4',width:"15%"}}>Password</th>
                    <th style={{color:'white', backgroundColor:'#4ecdc4',width:"15%"}}>Action</th>
                    <th style={{color:'white', backgroundColor:'#4ecdc4',width:"15%"}}>Action</th>
                    
                </tr>
            </thead>
            {showuserslist &&
            <tbody>
                {allusers}
            </tbody>
            }
            {showdeletedusers &&
                <tbody>
                    {DeletedUsers}
                </tbody>
            }           
        </table>
        }
            
        </div>
        </div>
        </div>
        </DefaultLayout>
    )
}
}
export default UsersList;
