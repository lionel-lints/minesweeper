import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game.js';
import Options from './Options.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React Minesweeper</h2>
        </div>
        <Options />
        <Game />
      </div>
    );
  }
}

export default App;
