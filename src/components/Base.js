import React, { PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import App from './App';

import '../styles/Base.css';

const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
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
      (Auth.isAuthenticated ? (
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
  component: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

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
        <p>You must log in to view the page at {from.pathname}</p>
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
      <Route path="/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
      <AuthButton />
      <ul>
        <li><Link to="/public">Public Page</Link></li>
        <li><Link to="/protected">Protected Page</Link></li>
      </ul>
    </div>
  </Router>
);

export default Base;
