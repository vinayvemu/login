import React, { Component } from 'react';


class Homepage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        users:[]
    }
}

componentDidMount () {
    this.renderUsers();
}
    
renderUsers = () =>{
    let users = this.state.users;
  users  = [{ 
        "id":1, "name":"test1", "age" : "11", "gender":"male", "email" : "test1@gmail.com", "phoneNo" : "9415346313" }, { "id" : 2, 
        "name":"test2", "age" : "12", "gender":"male", "email" : "test2@gmail.com", "phoneNo" : "9415346314" }, { "id":3, 
        "name":"test3", 
        "age" : "13", "gender":"male", "email" : "test3@gmail.com", "phoneNo" : "9415346315" }, { "id":4, 
        "name":"test4", "age" : "14", "gender":"male", "email" : "test4@gmail.com", "phoneNo" : "9415346316" }, { "id":5, 
        "name":"test5", "age" : "15", "gender":"male", "email" : "test5@gmail.com", "phoneNo" : "9415346317" }, { "id":6, 
        "name":"test6", "age" : "16", "gender":"male", "email" : "test6@gmail.com", "phoneNo" : "9415346318" } 
        ] 
        this.setState({users:users})
        
}

logout = () =>{
    sessionStorage.removeItem('userloggedin');
    window.location.reload();
}

render(){
	var userslist = this.state.users.map((item, i) => (
		<tr key={i} className="userlistitem" style={{textAlign:"center"}}>
			<td style={{width :'5%' }} >{item.id}</td>
			<td style={{width :'20%' }}>{item.name}</td>
			<td style={{width :'10%' }}>{item.age}</td>
            <td style={{width :'10%' }}>{item.gender}</td>
            <td style={{width :'25%' }}>{item.email}</td>
            <td style={{width :'25%' }}>{item.phoneNo}</td> 
		</tr>
		
	))
	
	return (
        <div style={{textAlign:'center'}}> <h2>Employees List</h2>
		<table className="userlist" >
			<thead>
				<tr>
					<th style={{width :'5%' }}>SLNo</th>
					<th style={{width:'20%'}}>Name</th>
					<th style={{width :'10%' }}> Age</th>
					<th style={{width :'10%' }}>Gender</th>
                    <th style={{width :'25%' }}> Email</th>
					<th style={{width :'25%' }}>Phone Num</th>
				</tr>
			</thead>
			{userslist}
            <tfoot>
            <div className="form-group login-submit">
                      <input
                        type="submit"
                        value="LOGOUT"
                        label ="LOGOUT"
                        className={'btn-primary btn-lg'}
                        onClick={this.logout}
                       />

                    </div>
            </tfoot>
			
		</table>
        </div>
    )
}
}
export default Homepage;
