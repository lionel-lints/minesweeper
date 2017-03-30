import React, { Component } from 'react';
import Tile from './Tile.js';
import './Board.css';

class Board extends Component {
  constructor(props){
    super(props);
  }

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
              key={tile.id} 
              smileyMouseDown={this.props.smileyMouseDown}
              smileyMouseUp={this.props.smileyMouseUp}
            />;
          })
        }      
      </div>
    );
  }
}

export default Board;
