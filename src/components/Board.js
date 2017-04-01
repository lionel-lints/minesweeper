import React, { Component } from 'react';
import '../styles/Board.css';

import Tile from './Tile.js';

class Board extends Component {
  componentWillMount(){
    this.props.generateTiles();
  }

  render() {
    return (
      <div className="Board" >
        {
          this.props.list.map((tile, i) => {
            return <Tile 
              active={this.props.active}
              runGame={this.props.runGame}
              dataTile={tile}
              smiley={this.props.smiley}
              key={tile.id} 
              reset={this.props.reset}
              smileyChange={this.props.smileyChange}
            />;
          })
        }      
      </div>
    );
  }
}

export default Board;
