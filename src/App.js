import React, { Component } from 'react';
import './App.css';
import Game from './Game.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Lionel's React Minesweeper</h2>
        </div>
        <Game />
      </div>
    );
  }
}

export default App;
