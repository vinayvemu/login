import React, { Component } from 'react';
import DefaultLayout from '../common/DefaultLayout'

import classnames from 'classnames';
import alertify from 'alertifyjs';
import "../LoginPage/alertifystyling.scss"


class Homepage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Allemails:[],
        composenewmail:{
            from:"",
            to:"",
            subject:"",
            message:"",
            createddate:""
        },
        errors:{},
        showcompose:false,
        showinbox:true,
        showsentitems:false,
        currentuser:""
    }
}

componentDidMount () {
    let currentuser = window.sessionStorage.getItem("currentuser" || "")
    let newmail =  this.state.composenewmail
    newmail.from = currentuser;
    let Allemails =[];
    let existedmails = JSON.parse(window.sessionStorage.getItem("Allemails" || "[]"))
    Allemails = existedmails;
    this.setState({currentuser:currentuser,composenewmail:newmail,Allemails:Allemails})
   this.updatestate()
}
    
updatestate = () =>{
    let existedmails = JSON.parse(window.sessionStorage.getItem("Allemails"))
   
    this.setState({Allemails:existedmails})
}


logout = () =>{
    sessionStorage.removeItem('userloggedin');
    alertify.notify("Logged Out successfully...", 'success', 5);
    window.location.reload();
}

onSubmit = () =>{
    let newmail = this.state.composenewmail
    let currentuser = this.state.currentuser
    let Allemails = JSON.parse(window.sessionStorage.getItem("Allemails" || []))
    let isValid = this.handlevalidation ();
    if(isValid){
    newmail.from = currentuser
    Allemails.push(newmail)
    window.sessionStorage.setItem("Allemails" , JSON.stringify(Allemails))
  
    this.setState({
        showcompose:false,
        showinbox:true,
        showsentitems:false
    })
    alertify.notify("Sent successfully...", 'success', 5);
    this.updatestate();
    }
    
}
handlevalidation = () =>{
    let composenewmail = this.state.composenewmail;
    let errors = {};
    if (composenewmail.to === '') errors.to = "To mail address can't be empty";
    if (composenewmail.subject === '') errors.subject = "subject can't be empty";
    if (composenewmail.message === '') errors.message = "message can't be empty";
    this.setState({ errors});
   return  Object.keys(errors).length === 0;

}
close = () =>{
    this.setState({
        showcompose:false
    })
}
openComposeMail =() =>{
    this.setState({
        showcompose:true,
        showinbox:false,
        showsentitems:false,
    })
}
openInboxMail = () =>{
    this.setState({
        showcompose:false,
        showinbox:true,
        showsentitems:false,
    })
}
openSentMail = () =>{
    this.setState({
        showcompose:false,
        showinbox:false,
        showsentitems:true,
    })
}

onChange = (e)=>{
    
    let errors = Object.assign({}, this.state.errors);
    delete errors[e.target.name];
    this.setState({ errors });

    let field = e.target.name;
    let composenewmail = this.state.composenewmail;

    composenewmail[field] = e.target.value;

    //set and return composenewmail states
    return this.setState({ composenewmail: composenewmail });
  }

  replyMail =(item) =>{
    
    let newmail= Object.assign({},item);
    let replyMaildata = Object.assign({},newmail)
    replyMaildata.from = newmail.to;
    replyMaildata.to = newmail.from;
    replyMaildata.message = "";
    this.setState({composenewmail:replyMaildata})
    this.openComposeMail();
  }
render(){
console.log(this.state)

    let {composenewmail,showcompose,showinbox,showsentitems,errors,Allemails,currentuser} = this.state;
   let that = this;
    let inboxitemslist = Allemails.map(function(o,i){
        if(o.to == currentuser  && o.to !== ""){
            return(
                <tr key={i}>
                    <td> {o.from}</td>
                    <td> {o.subject}</td>
                    <td> {o.message}</td>
                    <td> {o.createddate}</td>
                    <td>
                    <button
                     onClick={()=>that.replyMail(o)}>Replay</button>
                    </td>
                </tr>
            )
        }
    })
    let sentitemslist = Allemails.map(function(o,i){
        if(o.from == currentuser && o.to !== ""){
            return(
                <tr key={i}>
                    <td> {o.to}</td>
                    <td > {o.subject}</td>
                    <td > {o.message}</td>
                    <td > {o.createddate}</td>
                </tr>
            )
        }
    })
    console.log(sentitemslist)
	
	return (
       
		<DefaultLayout>
            <div style={{textAlign:'center',color:"#fff"}}> <h2>{!showcompose ?( showinbox?"Inbox Emails":"Sent Emails"):"New Email"} </h2>
            <div id="main" class="clear">
            <div id="sidebar">
              
                <button className="compose" onClick = {this.openComposeMail}>Compose</button>
                <button className="inbox" onClick = {this.openInboxMail}>Inbox</button>
                <button className="sent" onClick = {this.openSentMail}>Sent</button>
               
            </div>
        <div id="page-wrap">
        {showcompose &&
        <div className="composemail">
        <div className={classnames('wrap-input100 validate-input', { "alert-validate":errors.to})}   data-validate={errors.to}>
            <input
                className="mailinput"
                type="text"
                name="to"
                value={composenewmail.to}
                onChange={this.onChange}
                placeholder="To Address " />
                <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
           
            </div>
            <div className={classnames('wrap-input100 validate-input', { "alert-validate":errors.subject})}   data-validate={errors.subject}>
            <input
                className="mailinput"
                type="text"
                name="subject"
                value={composenewmail.subject}
                onChange={this.onChange}
                placeholder="subject" />

            </div>
            <div className={classnames('wrap-input100 validate-input', { "alert-validate":errors.message})}   data-validate={errors.message}>
            <textarea
                className="mailinputmessage"
                type="text"
                name="message"
                value={composenewmail.message}
                onChange={this.onChange}
                placeholder="message" />
                <span className="symbol-input100">
                <i className="fa fa-commenting-o" aria-hidden="true"></i>
                </span>
            </div>
            <div className="btn-row">

                <button className="btn-primary" onClick={this.onSubmit}>Submit</button>
                <button className="btn-cancel" onClick={this.close}>Cancel</button>
           </div>
            </div>
        }

        {!showcompose &&
        <table className="mailview" >
            <thead>
                <tr>
                    <th style={{color:'white', backgroundColor:'#4ecdc4',width:"20%"}}>{showinbox?"From":"To"}</th>
                    <th style={{color:'white', backgroundColor:'#4ecdc4',width:"15%"}}>Subject</th>
                    <th style={{color:'white', backgroundColor:'#4ecdc4',width:"35%"}}>Message</th>
                    <th style={{color:'white', backgroundColor:'#4ecdc4',width:"25%"}}>Date</th>
                    {showinbox && <th style={{color:'white', backgroundColor:'#4ecdc4',width:"5%"}}>Action</th>}
                    
                </tr>
            </thead>
            {showinbox &&
            <tbody>
                {inboxitemslist}
            </tbody>
            }
            {showsentitems &&
                <tbody>
                    {sentitemslist}
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
export default Homepage;
