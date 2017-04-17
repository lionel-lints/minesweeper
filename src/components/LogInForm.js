import React, { Component, PropTypes } from 'react';
import '../styles/LogInForm.css';

class LogInForm extends Component {

  render() {
    return (
      <div className="LogInForm">
        <form>
          <input placeholder="Email" />
          <input placeholder="Password" />
          <button>submit!</button>
        </form>
      </div>
    );
  }
}

LogInForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default LogInForm;
