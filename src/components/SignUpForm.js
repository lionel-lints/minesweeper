import React, { Component, PropTypes } from 'react';
import '../styles/SignUpForm.css';

class SignUpForm extends Component {

  render() {
    return (
      <div className="SignUpForm">
        <form>
          <input placeholder="First Name" />
          <input placeholder="Last Name" />
          <input placeholder="Email" />
          <input placeholder="Password" />
          <button>submit!</button>
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default SignUpForm;
