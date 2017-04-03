import React, { Component, PropTypes } from 'react';
import '../styles/Smiley.css';

import shades from '../images/smiley.ico';
import smiley from '../images/smiley1.ico';
import smileyFail from '../images/smiley3.ico';
import smileyOh from '../images/smiley2.ico';

class Smiley extends Component {
  constructor(props) {
    super(props);
    this.smiley = {
      0: smiley,
      1: smileyOh,
      2: shades,
      3: smileyFail,
    };
  }

  handleClick = () => {
    this.props.validateGame();
  }

  render() {
    return (
      <button className="Smiley" onClick={this.handleClick} >
        <img className="faceIcons" src={this.smiley[this.props.smiley]} alt="smiley face icon" />
      </button>
    );
  }
}

Smiley.propTypes = {
  smiley: PropTypes.number.isRequired,
  validateGame: PropTypes.func.isRequired,
};

export default Smiley;
