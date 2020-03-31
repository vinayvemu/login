import React, { Component } from 'react';
import DefaultLayout from '../common/DefaultLayout'


import {browserHistory} from 'react-router';
import alertify from 'alertifyjs';
import "../LoginPage/alertifystyling.scss"


class Urchoice extends React.Component {
    
    constructor(props) {
      super(props);
      this.state={
          msg:""
      }
    }

    OpenUserApp = () =>{
        alertify.notify("User Application...", 'success', 5);
        browserHistory.push('/User')

    }
    OpenEmailApp = () =>{
        alertify.notify("Email Application...", 'success', 5);
        browserHistory.push('/Homepage')
        
    }

render(){

	return (
       
		<DefaultLayout>
           <div className="Urchoice">
           <button className="switch" 
               onClick={this.OpenUserApp}
               >
                   Users Application
               </button>
               <button className="inbox"            
                onClick={this.OpenEmailApp}
               >
                   Email Application
               </button>
           </div>
        </DefaultLayout>
    )
}
}
export default Urchoice;
