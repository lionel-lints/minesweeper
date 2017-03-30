import React, { Component } from 'react';
import './Tile.css';
import flag from './images/flag.ico';
import mine from './images/mine2.ico';
import redMine from './images/mine.ico';
import defusedMine from './images/mine4.ico';

class Tile extends Component {
  constructor(props){
    super(props);
    this.flag = redMine;
    this.mine = mine;
  }

  handleClick = () => {
    this.props.runGame(this.props.dataTile.id);
    this.props.smileyMouseUp();
  }

  display = () => {
    if (!this.props.dataTile.show){
      // hidden items
      return 'Tile';  
    } else {
      if(this.props.dataTile.value === 0 || this.props.dataTile.value === 9){
        // 0 value item case and bomb case
        return 'TileShown';  
      } else {
        // non zero non-bomb number case
        return `TileShown num${this.props.dataTile.value}`;      
      }
    }
  }

  render() {
    let bomb = <img className='icons' src={this.mine} alt="" />
    return (
      <div 
        className={this.display()}  
        data-active={this.props.active}
        onMouseDown={this.props.smileyMouseDown}
        onMouseUp={this.handleClick}
      >
        { 
          !this.props.dataTile.show ?
          '' :
          this.props.dataTile.value === 9 ?
          bomb :
          this.props.dataTile.value === 0 ?
          '' :
          this.props.dataTile.value
        }
      </div>
    );
  }
}

export default Tile;
