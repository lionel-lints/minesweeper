import React, { Component, PropTypes } from 'react';
import '../styles/LogInForm.css';

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    /* NEED TO DO, set the user state and log in */
    event.preventDefault();
  }

  render() {
    return (
      <form className="LogInForm" onSubmit={this.handleSubmit}>
        <label htmlFor="email">
          Email:
          <input name="email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label htmlFor="password">
          Password:
          <input name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

LogInForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default LogInForm;
