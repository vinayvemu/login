class Auth {
    static loggedIn() {
      return !!sessionStorage.userloggedin;
    }
  
    static logOut() {
      sessionStorage.removeItem('userloggedin');
     
    }
  }
  
  export default Auth;