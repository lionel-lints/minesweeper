import React, { Component, PropTypes } from 'react';
import '../styles/Dashboard.css';

import AuthButtons from './AuthButtons';

class Dashboard extends Component {

  render() {
    return (
      <div>
        <AuthButtons
          isLoggedIn={this.props.isLoggedIn}
          logOut={this.props.logOut}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default Dashboard;
