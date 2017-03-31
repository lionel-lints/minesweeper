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

  breadthFirstSearch = (index, arr) => {
    const queue = this.getSquare(index, arr);

    while(queue.length > 0){
      // pop off the front index and check it out.
      let checkIndex = queue.shift();
      let currentItem = arr[checkIndex];
      if (currentItem.value === 9) continue;
      currentItem.show = true;
      if (currentItem.value === 0){
        queue.push(...this.getSquare(checkIndex, arr));
      }
    }
    return arr;
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
    this.setState({ activeGame: false, time: '000', smiley: 0, list: gameArray });
    return gameArray;
  }

  getSquare = (index, arr) => {
  return [-9,-8,-7,-1,0,1,7,8,9].map((item) => index + item)
    .filter((item) => item > -1 && item < arr.length)
    .filter((item) => !arr[item].show)
    .filter((item) => {
      let row = Math.sqrt(this.size);
      if (index % row === 0){
        return item % row !== 7; 
      } else if (index % row === 7){
        return item % row !== 0;
      } else {
        // return item toString to return index 0 along with others.
        return (item).toString();
      }
    });
  }

  runGame = (tileId) => {
    let gameArray = this.state.list.map(a => Object.assign({}, a));

    if(!this.state.activeGame){
      let bombs = Number(this.bombs);
      // check and set the bombs
      while(bombs >= 0){
        let ind = Math.floor(Math.random() * this.size);
        /* create array of values for surrounding indicies */ 
        let square = [-9,-8,-7,-1,0,1,7,8,9].map((item) => ind + item);
        /* check the array and see if there are any bombs nearby */
        if(gameArray[ind].value !== 9 && !square.includes(tileId)){
          gameArray[ind].value = 9;
          bombs--;
        }
      }

      gameArray = this.addValues(gameArray);
      gameArray[tileId].show = true;
      gameArray = this.breadthFirstSearch(tileId, gameArray)

      this.setState({ activeGame: true, time: '000', list: gameArray });
    } else {
      gameArray[tileId].show = true;
      if (gameArray[tileId].value === 9){
        let result = this.validateGame(tileId);
        this.setState({ list: result[1], activeGame: false, smiley: result[0] });
      } else {
        if (gameArray[tileId].value === 0){
          gameArray = this.breadthFirstSearch(tileId, gameArray)
        } 
        this.setState({ list: gameArray });
      }
    }
  }

  validateGame = (id) => {
    let newSmiley = this.state.smiley;
    let gameArray = this.state.list.map(a => Object.assign({}, a, { show: true }));
    if (id === 0 || id) {
      newSmiley = 3;
    } else {
      newSmiley = 2;
    }
    return [newSmiley, gameArray];
  }

  hideTiles = () => {
    let gameArray = this.state.list.map(a => Object.assign({}, a, { show: false }));
    this.setState({ list: gameArray, activeGame: false })
  }

  smileyChange = (eventType) => {
    // cases for mousedown: 
    // activeGame === true
    // activeGame === false
    if (eventType === 'mousedown' && this.state.activeGame){
      this.setState({ smiley: 1 });
    } else if (eventType === 'mouseup' && this.state.activeGame){
      this.setState({ smiley: 0});
    }
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
    arr = arr.map((digit) => (digit).toString()).join('');
    this.setState({ time: arr });
    return arr;
  }

  render() {
    return (
      <div className="Game">
        <Header 
          active={this.state.activeGame}
          bombs={this.bombs} 
          reset={this.generateGameTiles}
          smiley={this.state.smiley}
          tick={this.tick}
          time={this.state.time}
        />
        <Board 
          active={this.state.activeGame}
          generateTiles={this.generateGameTiles}
          list={this.state.list}
          reset={this.hideTiles}
          runGame={this.runGame}
          smileyChange={this.smileyChange}
        />
      </div>
    );
  }
}

export default Game;
