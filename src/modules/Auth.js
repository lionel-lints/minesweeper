class Auth {

  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
    fetch('http://localhost:3001/auth/loggedIn', {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Cache: 'no-cache',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status !== '304') {
        /* User is Authenticated, set state or call function */
        this.setState({
          user: data[0],
          isLoggedIn: true
        });
      }
    }).catch((error) => {
      /* Not so much */
    });
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

}

export default Auth;

