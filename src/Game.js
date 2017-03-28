import React, { Component } from 'react';
import './Game.css';
import Header from './Header.js';
import Board from './Board.js';

class Game extends Component {
  constructor(props){
    super(props);
    this.list = [];
    this.size = 64;
    this.bombs = '010';
  }

  generateRandomGame(){
    let gameArray = this.list; 
    let bombs = Number(this.bombs);
    for (let i = 0; i < this.size; i++) {
      gameArray.push(false);
    }
    while(bombs >= 0){
      let newBomb = Math.floor(Math.random() * this.size);
      if(!gameArray[newBomb]){
        gameArray[newBomb] = true;
        bombs--;
      }
    }
    return gameArray;
  }

  render() {
    return (
      <div className="Game">
        <Header bombs={this.bombs}/>
        <Board list={this.generateRandomGame()}/>
      </div>
    );
  }
}

export default Game;
