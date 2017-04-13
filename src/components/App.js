import React, { Component } from 'react';
import '../styles/App.css';

import Game from './Game';
import Dashboard from './Dashboard';

      /* eslint-disable no-console */
      /* eslint-disable no-debugger */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  componentWillMount() {
    fetch('https://mine-sweeper-server.herokuapp.com/api/v1/highscores', {
      // mode: 'no-cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Cache: 'no-cache',
        Authorization: 'Bearer jwtTokenGoesHere',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log('COOOKIES', document.cookie);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log('ERROR: ', error.message);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Lionel&apos;s React Minesweeper</h2>
          <h4>To defuse a mine, hold shift while clicking tile.</h4>
          <h4>To validate your game, click the smiley face.</h4>
        </div>
        <Game />
        <Dashboard isLoggedIn={this.state.isLoggedIn} />
      </div>
    );
  }
}

export default App;
