import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import '../styles/LoginForm.css';

class LoginForm extends Component {

  render() {
    return (
      <Card className="container">
        <form action="/" onSubmit={this.props.onSubmit}>
          <h2 className="card-heading">Login</h2>

          {this.props.successMessage && <p className="success-message">{this.props.successMessage}</p>}
          {this.props.errors.summary && <p className="error-message">{this.props.errors.summary}</p>}

          <div className="field-line">
            <TextField
              floatingLabelText="Email"
              name="email"
              errorText={this.props.errors.email}
              onChange={this.props.onChange}
              value={user.email}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={this.props.onChange}
              errorText={this.props.errors.password}
              value={user.password}
            />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label="Log in" primary />
          </div>

          <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
        </form> 
        <h4> Login or Register to track your scores!</h4>
        <button className="LoginForm">login</button>
        <button className="LoginForm">register</button>
      </Card>
    );
  }
}

LoginForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default LoginForm;
