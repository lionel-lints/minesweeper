import React, { Component, PropTypes } from 'react';
import '../styles/Game.css';

import Header from './Header';
import Board from './Board';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGame: false,
      gameStart: true,
      list: [],
      smiley: 0,
      time: '000',
    };
    this.size = 64;
    this.bombs = '010';
  }

  addBombs = (gameArray, id) => {
    let bombs = Number(this.bombs);
    /* Check and set the bombs */
    while (bombs > 0) {
      const ind = Math.floor(Math.random() * this.size);
      /* Create array of values for surrounding indicies */
      const square = [-9, -8, -7, -1, 0, 1, 7, 8, 9].map(item => ind + item);
      /* Check the array and see if there are any bombs nearby */
      if (gameArray[ind].value !== 9 && !square.includes(id)) {
        gameArray[ind].value = 9;
        bombs -= 1;
      }
    }
    return gameArray;
  }

  addValues = (list) => {
    /* Map across items, check all the surrounding spots, add one for each bomb */
    const newList = list.map((item, i, arr) => {
      if (item.value === 9) return item;

      const surroundingIndicies = this.surroundingSquare(i, arr);
      surroundingIndicies.forEach((index) => {
        if (arr[index].value === 9) item.value += 1;
      });
      return item;
    });
    return newList;
  }

  breadthFirstSearch = (index, arr) => {
    const queue = this.surroundingSquare(index, arr);

    while (queue.length > 0) {
      /* Pop off the front index and check it out */
      const checkIndex = queue.shift();
      const currentItem = arr[checkIndex];
      if (currentItem.value !== 9) {
        currentItem.show = true;
        if (currentItem.value === 0) {
          /* Recursively add to the queue */
          queue.push(...this.surroundingSquare(checkIndex, arr));
        }
      }
    }
    return arr;
  }

  evaluateClick = (id, event, arr) => {
    /* If tile is already displayed just return */
    if (!arr[id].show) {
      /* If shift is held down, change or add flag */
      if (event.shiftKey) {
        /* Add or change flag display on tile. */
        arr[id] = this.nextIcon(arr[id]);
        this.setState({ list: arr });
      /* If value is 0 run BFS and display tile */
      } else if (arr[id].value === 0) {
        arr[id].show = true;
        arr = this.breadthFirstSearch(id, arr);
        this.setState({ list: arr });
      /* If value is less than 9 display tile */
      } else if (arr[id].value < 9) {
        arr[id].show = true;
        this.setState({ list: arr });
      /* otherwise, value is 9, game FAIL  */
      } else {
        const result = arr.map(a => Object.assign({}, a, { show: true }));
        result[id].currentIcon = 'redMine';
        this.setState({
          activeGame: false,
          gameStart: false,
          list: result,
          smiley: 3,
        });
      }
    }
  }

  generateGameTiles = () => {
    const gameArray = [];
    for (let i = 0; i < this.size; i += 1) {
      const tile = {
        currentIcon: 'none',
        defused: false,
        id: i,
        show: false,
        value: 0,
      };
      gameArray.push(tile);
    }
    /* Initial state needs to be set */
    if (this.state.list.length === 0) {
      this.setState({ list: gameArray });
    }
    return gameArray;
  }

  nextIcon = (tile) => {
    if (tile.currentIcon === 'none') {
      tile.currentIcon = 'flag';
      tile.defused = true;
    } else if (tile.currentIcon === 'flag') {
      tile.currentIcon = 'question';
      tile.defused = false;
    } else {
      tile.currentIcon = 'none';
      tile.defused = false;
    }
    return tile;
  }

  reset = () => {
    this.setState({
      list: this.generateGameTiles(),
      activeGame: false,
      gameStart: true,
      time: '000',
      smiley: 0,
    });
  }

  runGame = (tileId, event) => {
    /* In all cases, clone list */
    let gameArray = this.state.list.map(a => Object.assign({}, a));
    /* if start of new game */
    if (!this.state.activeGame && this.state.gameStart) {
      /* Add game tiles */
      gameArray = this.generateGameTiles();
      /* Add values and bombs */
      gameArray = this.addValues(this.addBombs(gameArray, tileId));
      /* Set currentId to show & run BFS to display tiles */
      gameArray[tileId].show = true;
      gameArray = this.breadthFirstSearch(tileId, gameArray);
      this.setState({ activeGame: true, time: '000', list: gameArray });
      /* if end of game, reset game */
    } else if (!this.state.activeGame && !this.state.gameStart) {
      /* Reset game tiles, and reset game */
      gameArray = this.generateGameTiles();
      this.setState({ time: '000', list: gameArray, gameStart: true });
      /* Game is active, evaluate click */
    } else {
      this.evaluateClick(tileId, event, gameArray);
    }
  }

  smileyChange = (eventType) => {
    if (eventType === 'mousedown' && this.state.activeGame) {
      this.setState({ smiley: 1 });
    } else if (eventType === 'mouseup' && this.state.activeGame) {
      this.setState({ smiley: 0 });
    }
  }

  surroundingSquare = (index, arr) => {
    const square = [-9, -8, -7, -1, 0, 1, 7, 8, 9].map(item => index + item)
    .filter(item => item > -1 && item < arr.length)
    .filter(item => !arr[item].show)
    .filter((item) => {
      const row = Math.sqrt(this.size);
      /* Filter square based on sides of Board */
      if (index % row === 0) {
        return item % row !== 7;
      } else if (index % row === 7) {
        return item % row !== 0;
      }
      /* Return item toString to return index 0 along with others */
      return (item).toString();
    });
    return square;
  }

  tick = () => {
    let arr = this.state.time.split('').map(digit => Number(digit));
    /* Guard clause for timer state 999 */
    if (arr[0] + arr[1] + arr[2] === 27) return;
    /* Update each digit */
    if (arr[2] === 9) {
      arr[2] = 0;
      if (arr[1] === 9) {
        arr[0] += 1;
        arr[1] = 0;
      } else {
        arr[1] += 1;
      }
    } else {
      arr[2] += 1;
    }

    arr = arr.map(digit => (digit).toString()).join('');
    this.setState({ time: arr });
  }

  toggleTiles = (check, arr) => {
    let gameArray = this.state.list.map(a => Object.assign({}, a));
    if (check) {
      gameArray = this.state.list.map((item) => {
        if (item.show === false) arr.push(item.id);
        return Object.assign({}, item, { show: check });
      });
    } else {
      while (arr.length) {
        gameArray[arr.shift()].show = false;
      }
    }
    this.setState({ list: gameArray });
  }

  validateGame = () => {
    const gameValid = this.state.list.reduce((prev, curr) => {
      if ((curr.show === true && curr.value !== 9) ||
         (curr.defused === true && curr.value === 9)) {
        return prev;
      }
      return false;
    }, true);

    if (!this.state.activeGame || !gameValid) {
      this.reset();
    } else {
      const result = this.state.list.map(a => Object.assign({}, a, { show: true }));
      this.setState({ activeGame: false, gameStart: false, list: result, smiley: 2 });
    }
  }

  render() {
    return (
      <div className="Game">
        <Header
          active={this.state.activeGame}
          bombs={this.bombs}
          list={this.state.list}
          smiley={this.state.smiley}
          tick={this.tick}
          time={this.state.time}
          toggle={this.toggleTiles}
          validateGame={this.validateGame}
        />
        <Board
          active={this.state.activeGame}
          generateGameTiles={this.generateGameTiles}
          list={this.state.list}
          reset={this.reset}
          runGame={this.runGame}
          smileyChange={this.smileyChange}
        />
      </div>
    );
  }
}

export default Game;
