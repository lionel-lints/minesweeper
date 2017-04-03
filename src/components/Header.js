import React, { Component, PropTypes } from 'react';
import '../styles/Header.css';

import BombCount from './BombCount';
import Smiley from './Smiley';
import Timer from './Timer';

class Header extends Component {

  render() {
    return (
      <div className="Header">
        <BombCount
          bombs={this.props.bombs}
          list={this.props.list}
          toggle={this.props.toggle}
        />
        <Smiley
          smiley={this.props.smiley}
          validateGame={this.props.validateGame}
        />
        <Timer
          active={this.props.active}
          time={this.props.time}
          tick={this.props.tick}
        />
      </div>
    );
  }
}

Header.propTypes = {
  active: PropTypes.bool.isRequired,
  bombs: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  smiley: PropTypes.number.isRequired,
  tick: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  validateGame: PropTypes.func.isRequired,
};

export default Header;
