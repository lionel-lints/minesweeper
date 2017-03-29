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
    let gameArray = this.state.list.map(a => Object.assign({}, a));

    if(!this.state.activeGame){
      // this could be refactored to deal with scaling issues when there
      // are high % of bombs.
      while(bombs >= 0){
        let newBombIndex = Math.floor(Math.random() * this.size);
        // set bombs with 0:
        if(gameArray[newBombIndex].value !== 9 && tileId !== newBombIndex){
          gameArray[newBombIndex].value = 9;
          bombs--;
        }
      }
      // set values for items near bombs.
      gameArray = this.addValues(gameArray);
      
      // do a recursive BFS to expand all the nodes here.

      this.setState({ activeGame: true, time: '000', list: gameArray });
    }
  }

  addValues = (list) => {
    const rowLength = Math.sqrt(this.size);
    // map across items, check all the surrounding spots, add one for each bomb:
    return list.map((item, i, arr) => {
      if(item.value === 9) return item;
      if(i % rowLength !== 0 && arr[i-1] && arr[i-1].value === 9) item.value += 1;
      if(i % rowLength !== 7 && arr[i+1] && arr[i+1].value === 9) item.value += 1;

      if(i % rowLength !== 0 && arr[i-1-rowLength] && arr[i-1-rowLength].value === 9) item.value += 1;
      if(arr[i-rowLength] && arr[i-rowLength].value === 9) item.value += 1;
      if(i % rowLength !== 7 && arr[i+1-rowLength] && arr[i+1-rowLength].value === 9) item.value += 1;

      if(i % rowLength !== 0 && arr[i-1+rowLength] && arr[i-1+rowLength].value === 9) item.value += 1;
      if(arr[i+rowLength] && arr[i+rowLength].value === 9) item.value += 1;
      if(i % rowLength !== 7 && arr[i+1+rowLength] && arr[i+1+rowLength].value === 9) item.value += 1;

      return item;
    });
  }

  generateGameTiles = () => {
    let gameArray =  []; 
    for (let i = 0; i < this.size; i++) {
      let tile = {
        show: false,
        defused: false,
        value: 0,
        id: i
      }
      gameArray.push(tile);
    }
    this.setState({ activeGame: false, time: '000', list: gameArray });
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
          active={this.state.activeGame}
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
