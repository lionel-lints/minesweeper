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

  BFS = (index, arr) => {
    const queue = [-9,-8,-7,-1,0,1,7,8,9].map((item) => index + item)
    .filter((item) => item > -1 && item < arr.length)
    .filter((item) => !arr[item].show)
    .filter((item) => {
      let row = Math.sqrt(this.size);
      if (index % row === 0){
        return item % row !== 7; 
      } else if (index % row === 7){
        return item % row !== 0;
      } else {
        // return item to string to return index 0 along with others.
        return (item).toString();
      }
    });

    while(queue.length > 0){
      // pop off the front index and check it out.
      let checkIndex = queue.shift();
      let currentItem = arr[checkIndex];
      if (currentItem.value === 9) continue;
      currentItem.show = true;
      if (currentItem.value === 0){
        queue.push(...[-9,-8,-7,-1,1,7,8,9].map((item) => checkIndex + item )
        .filter((item) => item > -1 && item < arr.length )
        .filter((item) => !arr[item].show )
        .filter((item) => {
          let row = Math.sqrt(this.size);
          if (checkIndex % row === 0){
            return item % row !== 7; 
          } else if (checkIndex % row === 7){
            return item % row !== 0;
          } else {
            return (item).toString();
          }
        }));
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
      gameArray = this.BFS(tileId, gameArray)

      this.setState({ activeGame: true, time: '000', list: gameArray });
    } else {
      gameArray[tileId].show = true;
      if (gameArray[tileId].value === 9){
        // lose game steps
        // set active game to false
        // stop timer
        // show all bombs, yours will be styled red.
        // set smiley to frowny
        this.validateGame(true);
      } else {
        if (gameArray[tileId].value === 0){
          gameArray = this.BFS(tileId, gameArray)
        } 
        this.setState({ list: gameArray });
      }
    //edge cases to think about later include how to flag bombs 
    //and what the win condition actually looks like.
    }
  }

  validateGame = (bomb=false) => {
    let smiley = this.state.smiley;
    let gameArray = [];
    if (bomb) {
     smiley = 3;
     gameArray = this.displayAll();
    } else {
      //you win.
    }

    this.setState({ activeGame: false, smiley: smiley, list: gameArray });
  }

  displayAll = () => {
    let gameArray = this.state.list.map(a => Object.assign({}, a, { show: true }));
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
          active={this.state.activeGame}
          generateTiles={this.generateGameTiles}
          list={this.state.list}
          runGame={this.runGame}
          smileyMouseDown={this.smileyMouseDown}
          smileyMouseUp={this.smileyMouseUp}
        />
      </div>
    );
  }
}

export default Game;
