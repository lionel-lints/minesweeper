import React, { Component } from 'react';
import '../styles/Tile.css';

import defusedMine from '../images/mine4.ico';
import flag from '../images/flag.ico';
import mine from '../images/mine2.ico';
import question from '../images/tile2.ico';
import redMine from '../images/mine.ico';

class Tile extends Component {
  constructor(props){
    super(props);
    this.icon = {
      defusedMine,
      flag,
      mine,
      question,
      redMine
    };
    this.currentIcon = 'mine';
  }

  display = () => {
    if (!this.props.dataTile.show){
      // hidden items
      return 'Tile';  
    } else if(this.props.dataTile.value === 0 || this.props.dataTile.value === 9){
      // 0 value case and bomb case
      return 'TileShown';  
    } else {
      // non zero non-bomb number case
      return `TileShown num${this.props.dataTile.value}`;      
    }
  }

  handleClick = (event) => {
    this.props.smileyChange(event.type);
    if (event.type === 'mousedown' && !this.props.active){
      this.props.runGame(this.props.dataTile.id);
    } else if (event.type === 'mouseup'){
      this.props.active ?
        this.props.runGame(this.props.dataTile.id) :
        this.props.reset();
    }
  }

  handleDoubleClick = () => {

  }

  render() {
    let icon = <img className='icons' src={this.icon[this.currentIcon]} alt="" />
    return (
      <div 
        className={this.display()}  
        data-active={this.props.active}
        onDoubleClick={this.handleDoubleClick}
        onMouseDown={this.handleClick}
        onMouseUp={this.handleClick}
      >
        { 
          !this.props.dataTile.show ?
          '' :
          this.props.dataTile.value === 9 ?
          icon :
          this.props.dataTile.value === 0 ?
          '' :
          this.props.dataTile.value
        }
      </div>
    );
  }
}

export default Tile;
