import React, { Component } from 'react';
import '../styles/App.css';

import Game from './Game';
import Dashboard from './Dashboard';

/* eslint-disable no-console */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {
        email: null,
        first_name: null,
        last_name: null
      }
    };
  }

  componentDidMount() {
    /* Check to see if valid JWT cookie, if so, log in user */
    fetch('http://localhost:3001/auth/loggedIn', {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Cache: 'no-cache',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status !== '304') {
        this.setState({
          user: data[0],
          isLoggedIn: true
        });
      }
    }).catch((error) => {
    });
  }

  logIn = () => {

  }

  logOut = () => {
    /* log out user */
    fetch('http://localhost:3001/auth/logout', {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Cache: 'no-cache',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      this.setState({
        user: data.user,
        isLoggedIn: data.isLoggedIn
      });
    }).catch((error) => {
      console.log('ERROR: ', error.message);
    });
  }

  register = () => {

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Lionel&apos;s React Minesweeper</h2>
          <h4>To defuse a mine, hold shift while clicking tile.</h4>
          <h4>To validate your game, click the smiley face.</h4>
        </div>
        <Game isLoggedIn={this.state.isLoggedIn} />
        <Dashboard
          isLoggedIn={this.state.isLoggedIn}
          logOut={this.logOut}
        />
      </div>
    );
  }
}

export default App;
