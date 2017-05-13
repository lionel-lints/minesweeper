import React, { Component, PropTypes } from 'react';
import '../styles/SignUpForm.css';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
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
      <form className="SignUpForm" onSubmit={this.handleSubmit}>
        <label htmlFor="first_name">
          First Name:
          <input name="first_name" value={this.state.first_name} onChange={this.handleChange} />
        </label>
        <label htmlFor="last_name">
          Last Name:
          <input name="last_name" value={this.state.last_name} onChange={this.handleChange} />
        </label>
        <label htmlFor="email">
          Email Addr:
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

SignUpForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default SignUpForm;
