import React, { Component } from 'react';
import Timer from './Timer.js';
import BombCount from './BombCount.js';
import Smiley from './Smiley.js';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <BombCount bombs={this.props.bombs} />
        <Smiley smiley={this.props.smiley} reset={this.props.reset}/>
        <Timer 
          active={this.props.active}
          time={this.props.time}
          tick={this.props.tick}
          data-value="clock"/>
      </div>
    );
  }
}

export default Header;
