import React, { PropTypes } from "react";
import { Link, IndexLink } from "react-router";



class Header extends React.Component {
  constructor(props) {
    super();
    this.state={
        Userslist:[]
    }
  }

 
logOut = () =>{
   
    sessionStorage.removeItem('userloggedin');
    window.location.reload();
}
componentDidMount (){
  let users =  JSON.parse(window.sessionStorage.getItem("userslist"))
  this.setState({
      Userslist:users
  })
}
 
UpdateUser = (user) =>{
    window.sessionStorage.setItem("currentuser",user)
    window.location.reload()

}
showList = () =>{
    this.setState({show:true})
}

  render() {
      console.log(this.state)
      let Userslist = this.state.Userslist
      let that = this;
      let userList = Userslist.map(function(user,i){
          return(
            <ul className="dropdown-menu" role="menu">
            <li><Link to={`/Homepage`} onClick={() =>that.UpdateUser(user.Email)}><i className="fa fa-sign-out" aria-hidden="true"></i>{user.Name} </Link></li>
        </ul>
          )
      })
    return (
      <header className="main__header">
        <div className="headerRow">
          <div className="headerRow__cell--left">
          </div>
          <div className="headerRow__cell--right">
            

            <ul className="c-userController">
            <li className="dropdown" >
              <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                <b onClick={this.showList}><img className="iconBuddy" src={require('./boy.svg')} /></b>
                <span className="angle-down icon-559" style={{color:"#fff"}}></span>
              </a>
              {userList}
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
