import React, { Component } from 'react';
import './Game.css';
import Header from './Header.js';
import Board from './Board.js';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = { 
      list: [],
      smiley: 0
    };
    // at some point size and bombs may be moved into props
    // but only if I make them editable in the options component:
    this.size = 64;
    this.bombs = '010';
  }

  smileyMouseDown = () => {
    console.log("RUNNNNNN")
    let newSmiley = this.state.smiley ? 0 : 1;
    this.setState({ smiley: newSmiley });
  }

  smileyMouseUp = () => {
    console.log("RANNNNNN")
    let newSmiley = this.state.smiley ? 0 : 1;
    this.setState({ smiley: newSmiley });
  }

  generateNewGame = () => {
    let gameArray = this.state.list; 
    let bombs = Number(this.bombs);
    for (let i = 0; i < this.size; i++) {
      let tile = {
        show: false,
        value: 9
      }
      gameArray.push(tile);
    }
    while(bombs >= 0){
      let newBombIndex = Math.floor(Math.random() * this.size);
      // set bombs with 0:
      if(gameArray[newBombIndex].value){
        gameArray[newBombIndex].value = 0;
        bombs--;
      }
    }
    return gameArray;
  }

  render() {
    return (
      <div className="Game">
        <Header 
          bombs={this.bombs} 
          reset={this.generateNewGame}
          smiley={this.state.smiley}
        />
        <Board 
          list={this.state.list}
          reset={this.generateNewGame}
          smileyMouseDown={this.smileyMouseDown}
          smileyMouseUp={this.smileyMouseUp}
        />
      </div>
    );
  }
}

export default Game;
