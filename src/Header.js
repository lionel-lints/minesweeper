import React, { Component } from 'react';
import Timer from './Timer.js';
import BombCount from './BombCount.js';
import Smiley from './Smiley.js';

import './Header.css';
import shades from './images/smiley.ico';
import smiley from './images/smiley1.ico';

class Header extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="Header">
        <BombCount bombs={this.props.bombs} />
        <Smiley smiley={this.props.smiley} reset={this.props.reset}/>
        <Timer data-value="clock"/>
      </div>
    );
  }
}

export default Header;
