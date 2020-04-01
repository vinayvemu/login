import React, { Component } from 'react';
import DefaultLayout from '../common/DefaultLayout'

import classnames from 'classnames';
import alertify from 'alertifyjs';
import axios from 'axios'
import "../LoginPage/alertifystyling.scss"


///// Declaring Static URL and Headers with API KEY.

const API_URL = 'https://api.close.com';
const headers = {
    'Content-Type': 'application/json',
    'api_key': 'api_45gYXpT0EZ8N6bXU8aMqxg.6gk65Pw4QohT18xx2NF3Yi'
  }





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
    this.updatestate();

    //// When component renders Here we will call a function to get the Emails list from SERVER

    this.getAllEmails();
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


////Here we will call API to get All Emails for the User
/// In request we need to pass Userid since we dont developed it completely i tried passing static ID ie 1234
getAllEmails = () =>{
    
    var reqQuery ={}
    const url = `${API_URL}/api/v1/email_template/1234/json`;

    axios.get(url,reqQuery,{headers:headers})
      .then((response) => {
        console.log(response)

        //// After getting Response from API Email our state data is updated with responsedata by setState;
        let Allemails = this.state.Allemails;
        Allemails = response;
        this.setState({
            Allemails:Allemails
        });
    })
}


//// To submit Email through API


 onSubmitemail = () =>{
         let that = this;
          
          var reqQuery ={};
          let Newmail = that.state.composenewmail;
//// Building Req for Api as per documentation, we can change the compose mailobject in state with thesame values of req query to create email
//// here i wrote it before thisapi integration i just build new req object with data assigned from our state object


          reqQuery["name"] = Newmail.to;
          reqQuery["subject"] = Newmail.subject;
          reqQuery["body"] = Newmail.message;
          reqQuery["is_shared"] = false;
          console.log(JSON.stringify(reqQuery))

          const url = `${API_URL}/api/v1/email_template/json`;

          axios.post(url,reqQuery,{headers:headers})
            .then((response) => {

                //  if we have any specifuc api to get list of sent mails we will need to call back after getting succes response
                // if we dont have that api and need to manage the all mails based on condition by checking any property from email object we need to store the sent email in our state or Local storage as per need of Our application
                
                console.log(response)
            });
        
        }




//// Without API calling We are storing email data in session storage

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
    this.close();
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
    let composenewmail ={
        from:"",
        to:"",
        subject:"",
        message:"",
        createddate:""
    }
    this.setState({
        composenewmail:composenewmail,
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

//// If we have specific apisto get inbox and sent mails seperately we can define two variables with sentmails and inbox mails as array in state
//// As samewe can get those arrays of emails and return the data as we requiresd to show in UI

//// present im filtering all emails into sent and inbox by checking current user email with the from/to address in email data respectively

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
                     onClick={()=>that.replyMail(o)}>Reply</button>
                    </td>
                </tr>
            )
        }
    })
    let sentitemslist = Allemails.map(function(o,i){
        if(o.from == currentuser && o.to !== ""){
            return(
                <tr key={i}>
                    <td>  {o.to}</td>
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

                <button className="btn-primary" onClick={this.onSubmitemail}>Submit</button>
                <button className="btn-cancel" onClick={this.close}>Cancel</button>
           </div>
            </div>
        }

        {!showcompose &&
        <table className="mailview" >
            <thead>
                <tr>
                    <th style={{color:'white', backgroundColor:'#4ecdc4',width:"20%"}}>{showinbox?"From":"To"}</th>
                    <th style={{color:'white', backgroundColor:'#4ecdc4',width: "15%"}}>Subject</th>
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
