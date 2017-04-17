import React, { PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import App from './App';
import Dashboard from './Dashboard';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';

import '../styles/Base.css';

const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
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
      if (data.status === '200') {
        this.isAuthenticated = true;
        cb();
      }
    }).catch((error) => {
      this.isAuthenticated = false;
    });
  },
  signout(cb) {
    /* log out user */
    fetch('http://localhost:3001/auth/logout', {
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
      this.isAuthenticated = false;
    }).catch((error) => {
    });
  }
};

const AuthButton = withRouter(({ history }) => (
  Auth.isAuthenticated ? (
    <p>
      Welcome!
      <button
        onClick={() => {
          Auth.signout(() => history.push('/'));
        }}
      >
        Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (Auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    Auth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div>
        <p>You must log in to view the {from.pathname} page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.object.isRequired,
};

const Base = () => (
  <Router>
    <div className="Base">
      <div className="Base-header">
        <h2>Welcome to Lionel&apos;s React Minesweeper</h2>
        <h4>To defuse a mine, hold shift while clicking tile.</h4>
        <h4>To validate your game, click the smiley face.</h4>
      </div>
      <Route path="/public" component={App} />
      <Route path="/login" component={LogInForm} />
      <Route path="/register" component={SignUpForm} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <AuthButton />
      <Link to="/public"><button>Continue without logging in</button></Link>
      <button><Link to="/login">Log in</Link></button>
      <button><Link to="/register">Sign up</Link></button>
    </div>
  </Router>
);

export default Base;
