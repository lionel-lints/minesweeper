import React, { Component } from 'react';
import '../styles/BombCount.css';

class BombCount extends Component {
  constructor(props){
    super(props);
    this.viewArray = [];
  }

  handleClick = (event) => {
    if (event.type === 'mousedown'){
      this.props.toggle(true, this.viewArray);
    } else if (event.type === 'mouseup'){
      this.props.toggle(false, this.viewArray);
    }
  }
  
  render() {
    const defused = this.props.list.reduce((prev, curr) => {
      if (prev >= this.props.bombs) return prev;
      return curr.defused ? prev + 1: prev;
    }, 0);
    return (
      <div 
        className="BombCount"
        onMouseDown={this.handleClick}
        onMouseUp={this.handleClick}>
        {this.props.bombs - defused} 
      </div>
    );
  }
}

export default BombCount;
