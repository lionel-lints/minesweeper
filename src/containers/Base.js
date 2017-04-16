import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router-dom';
import Auth from '../modules/Auth';

const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="App-header">
        <h2>Welcome to Lionel&apos;s React Minesweeper</h2>
        <h4>To defuse a mine, hold shift while clicking tile.</h4>
        <h4>To validate your game, click the smiley face.</h4>
      </div>
      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <Link to="/logout">Log out</Link>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/anon">Continue Without Logging in</Link>
        </div>
      )}

    </div>
    {children}
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
