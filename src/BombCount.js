import React, { Component } from 'react';
import './BombCount.css';

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
    return (
      <div 
        className="BombCount"
        onMouseDown={this.handleClick}
        onMouseUp={this.handleClick}>
        {this.props.bombs} 
      </div>
    );
  }
}

export default BombCount;
