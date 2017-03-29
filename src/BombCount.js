import React, { Component } from 'react';
import './BombCount.css';

class BombCount extends Component {

  render() {
    return (
      <div className="BombCount">
        {this.props.bombs} 
      </div>
    );
  }
}

export default BombCount;
