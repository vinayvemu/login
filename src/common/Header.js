import React, { PropTypes } from "react";
import { Link, IndexLink } from "react-router";



class Header extends React.Component {
  constructor(props) {
    super();
  }

 
logOut = () =>{
   
    sessionStorage.removeItem('userloggedin');
    window.location.reload();
}
 

  render() {
    return (
      <header className="main__header">
        <div className="headerRow">
          <div className="headerRow__cell--left">
          </div>
          <div className="headerRow__cell--right">
            

            <ul className="c-userController">
            <li className="dropdown">
              <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                <b><img className="iconBuddy" src={require('./boy.svg')} /></b>
                <span className="angle-down icon-559" style={{color:"#fff"}}></span>
              </a>
              <ul className="dropdown-menu" role="menu">
                <li><Link to={`/login`} onClick={this.logOut}><i className="fa fa-sign-out" aria-hidden="true"></i> Sign Out</Link></li>
              </ul>
            </li>
          </ul>
          </div>
        </div>
      </header>
    );
  }
}


export default Header;
