import React, { Component, PropTypes } from 'react';
import '../styles/Board.css';

import Tile from './Tile';

class Board extends Component {
  componentWillMount() {
    this.props.generateGameTiles();
  }

  mapTiles = () => {
    const TilesArr = this.props.list.map(tile => (<Tile
      active={this.props.active}
      runGame={this.props.runGame}
      tile={tile}
      key={tile.id}
      reset={this.props.reset}
      smileyChange={this.props.smileyChange}
    />));
    return TilesArr;
  }

  render() {
    return (
      <div className="Board" >
        { this.mapTiles() }
      </div>
    );
  }
}

Board.propTypes = {
  active: PropTypes.bool.isRequired,
  generateGameTiles: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  reset: PropTypes.func.isRequired,
  runGame: PropTypes.func.isRequired,
  smileyChange: PropTypes.func.isRequired,
};

export default Board;
