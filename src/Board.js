import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="Board">
        {
          this.props.list.map((listValue, i) => {
            return <Tile key={i} data-value={listValue} />;
          })
        }      
      </div>
    );
  }
}

class Tile extends Component {
  render() {
    return (
      <div className="Tile">
      </div>
    );
  }
}
export default Board;
