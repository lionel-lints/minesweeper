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
  }

  handleClick = () => {
    if(!this.props.active){
      this.props.runGame(this.props.dataTile.id);
    }

    this.props.smileyMouseUp();
    // preflight check: if game is complete, reset game(unmount and remount the whole game component).
    // first check if game hasn't been populated, 
    //   if not populate game and do first visual expansion.
    //   if so:
    // second check value of Tile and do the following:
    //   if value is 0-8 do surrounding expanison
    //   if value is 9 display all tiles, and do game validation check:
    //     if game is winning show smiley as shades
    //     if game is losing show smiley as frowny
    //
    //edge cases to think about later include how to flag bombs 
    //and what the win condition actually looks like.
  }
  render() {
    let tileRend = this.props.dataTile.value !== 0 ?
      this.props.dataTile.value === 9 ? 
        <img className='icons' src={this.flag} alt="" /> :
        this.props.dataTile.value :
      '';
    return (
      <div 
        className="Tile" 
        active={this.props.active}
        onMouseDown={this.props.smileyMouseDown}
        onMouseUp={this.handleClick}
      >
        { tileRend }
      </div>
    );
  }
}

export default Tile;
