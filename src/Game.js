import React, { Component } from 'react';
import './Game.css';
import Header from './Header.js';
import Board from './Board.js';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = { 
      activeGame: false,
      list: [],
      smiley: 0,
      time: '000' 
    };

    // at some point size and bombs may be moved into props
    // but only if I make them editable in the options component:
    this.size = 64;
    this.bombs = '010';
  }

  addBombs = (tileId) => {
    let bombs = Number(this.bombs);
    let gameArray = this.state.list; 

    if(!this.state.activeGame){
      while(bombs >= 0){
        let newBombIndex = Math.floor(Math.random() * this.size);
        // set bombs with 0:
        if(gameArray[newBombIndex].value && tileId !== newBombIndex){
          gameArray[newBombIndex].value = 0;
          bombs--;
        }
      }
      this.setState({ activeGame: true, time: '000' });
    }
  }

  generateGameTiles = () => {
    let gameArray =  []; 
    for (let i = 0; i < this.size; i++) {
      let tile = {
        show: false,
        defused: false,
        value: 9,
        id: i
      }
      gameArray.push(tile);
    }
    this.setState({ activeGame: false, list: gameArray });
    return gameArray;
  }

  smileyMouseDown = () => {
    let newSmiley = this.state.smiley ? 0 : 1;
    this.setState({ smiley: newSmiley });
  }

  smileyMouseUp = () => {
    let newSmiley = this.state.smiley ? 0 : 1;
    this.setState({ smiley: newSmiley });
  }

  tick = () => {
    let arr = this.state.time.split('');
    arr = arr.map((digit) => { return Number(digit) });
    if (arr[0] + arr[1] + arr[2] === 27) return;
    if (arr[2] + 1 === 10){
      if (arr[1] + 1 === 10) {
        arr[0] += 1;
        arr[1] = 0;
        arr[2] = 0;
      } else {
        arr[1] += 1;
        arr[2] = 0;
      }
    } else {
      arr[2] += 1;
    }
    arr = arr.map((digit) => { return (digit).toString() }).join('');
    this.setState({ time: arr });
    return arr;
  }

  render() {
    return (
      <div className="Game">
        <Header 
          bombs={this.bombs} 
          time={this.state.time}
          tick={this.tick}
          smiley={this.state.smiley}
          reset={this.generateGameTiles}
        />
        <Board 
          list={this.state.list}
          reset={this.generateGameTiles}
          addBombs={this.addBombs}
          active={this.state.activeGame}
          smileyMouseDown={this.smileyMouseDown}
          smileyMouseUp={this.smileyMouseUp}
        />
      </div>
    );
  }
}

export default Game;
