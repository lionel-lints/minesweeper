import React, { Component } from 'react';
import './Game.css';
import Header from './Header.js';
import Board from './Board.js';

class Game extends Component {
  render() {
    return (
      <div className="Game">
        <Header />
        <Board />
      </div>
    );
  }
}

export default Game;
