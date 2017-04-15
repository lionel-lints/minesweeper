import React, { Component, PropTypes } from 'react';
import '../styles/AuthButtons.css';

import Game from './Game';

class AuthButtons extends Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    if (isLoggedIn) {
      return (
        <div >
          <h4> You have logged in!!</h4>
          <button onClick={this.props.logOut}className="AuthButtons">logout</button>
        </div>
      );
    }
    return (
      <div >
        <h4> Login or Register to track your scores!</h4>
        <button className="AuthButtons">login</button>
        <button className="AuthButtons">register</button>
      </div>
    );
  }
}

AuthButtons.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default AuthButtons;
