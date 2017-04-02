import React, { Component } from 'react';
import '../styles/Header.css';

import BombCount from './BombCount.js';
import Smiley from './Smiley.js';
import Timer from './Timer.js';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <BombCount 
          bombs={this.props.bombs} 
          list={this.props.list}
          toggle={this.props.toggle} />
        <Smiley 
          smiley={this.props.smiley}
          validateGame={this.props.validateGame}
          reset={this.props.reset} />
        <Timer 
          active={this.props.active}
          time={this.props.time}
          tick={this.props.tick} />
      </div>
    );
  }
}

export default Header;
