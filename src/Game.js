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

    // at some point size and bombs may be moved into props based on options.
    this.size = 64;
    this.bombs = '010';
  }

  addValues = (list) => {
    const row = Math.sqrt(this.size);
    // map across items, check all the surrounding spots, add one for each bomb:
    return list.map((item, i, arr) => {
      if(item.value === 9) return item;

      if(i % row !== 0){
        if(arr[i-1] && arr[i-1].value === 9) item.value += 1;
        if(arr[i-1-row] && arr[i-1-row].value === 9) item.value += 1;
        if(arr[i-1+row] && arr[i-1+row].value === 9) item.value += 1;
      }

      if(i % row !== 7){
        if(arr[i+1] && arr[i+1].value === 9) item.value += 1;
        if(arr[i+1-row] && arr[i+1-row].value === 9) item.value += 1;
        if(arr[i+1+row] && arr[i+1+row].value === 9) item.value += 1;
      }

      if(arr[i-row] && arr[i-row].value === 9) item.value += 1;
      if(arr[i+row] && arr[i+row].value === 9) item.value += 1;
      return item;
    });
  }

  BFS = (index, queue) => {
    // guard clause, when queue is empty return:
    if (queue.length === 0) return;

    queue = queue || [-9,-8,-7,-1,1,7,8,9].map((item) => index + item)
      .filter((item) => item > -1 && item < this.state.list.length)
      .filter((item) => {
        return item % Math.sqrt(this.size) !== 7 && item % Math.sqrt(this.size) !== 0;
      })

    let currentItem = this.state.list[queue.shift()];
    // recursive case, check first item in queue
    // if item is bomb, don't display
    // if item has value other than 0 display
    // if item has value 0, recursively call BFS, passing in the item index

  }

  generateGameTiles = () => {
    const gameArray =  []; 
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

  runGame = (tileId) => {
    let bombs = Number(this.bombs);
    let gameArray = this.state.list.map(a => Object.assign({}, a));

    if(!this.state.activeGame){
      // check and set the bombs
      while(bombs >= 0){
        let ind = Math.floor(Math.random() * this.size);
        let square = [-9,-8,-7,-1,0,1,7,8,9].map((item) => ind + item);
        if(gameArray[ind].value !== 9 && !square.includes(tileId)){
          gameArray[ind].value = 9;
          bombs--;
        }
      }
      // set values for items near bombs.
      gameArray = this.addValues(gameArray);
      
      // do a recursive BFS to expand all the nodes here.

      this.setState({ activeGame: true, time: '000', list: gameArray });
    }
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
          generateTiles={this.generateGameTiles}
          runGame={this.runGame}
          active={this.state.activeGame}
          smileyMouseDown={this.smileyMouseDown}
          smileyMouseUp={this.smileyMouseUp}
        />
      </div>
    );
  }
}

export default Game;
