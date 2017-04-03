import React, { Component } from 'react';
import '../styles/App.css';

import Game from './Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Lionel&apos;s React Minesweeper</h2>
          <h4>To defuse a mine, hold shift while clicking tile.</h4>
          <h4>To validate your game, click the smiley face.</h4>
        </div>
        <Game />
      </div>
    );
  }
}

export default App;
