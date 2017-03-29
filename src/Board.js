import React, { Component } from 'react';
import Tile from './Tile.js';
import './Board.css';

class Board extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.reset();
  }

  render() {
    return (
      <div className="Board" >
        {
          this.props.list.map((tile, i) => {
            return <Tile 
              key={i} 
              data-tile={tile}
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
