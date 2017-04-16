import React, { Component, PropTypes } from 'react';
import '../styles/Dashboard.css';

class Dashboard extends Component {

  render() {
    return (
      <div>
        <p>DashBoard Component!</p>
      </div>
    );
  }
}

Dashboard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default Dashboard;
