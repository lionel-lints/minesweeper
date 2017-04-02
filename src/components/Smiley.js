import React, { Component } from 'react';
import '../styles/Smiley.css';

import shades from '../images/smiley.ico';
import smiley from '../images/smiley1.ico';
import smileyFail from '../images/smiley3.ico';
import smileyOh from '../images/smiley2.ico';

class Smiley extends Component {
  constructor(props){
    super(props)
    this.smiley = {
      '0': smiley,
      '1': smileyOh,
      '2': shades,
      '3': smileyFail
    }
  }

  handleClick = () => {
    this.props.validateGame()
  }

  render() {
    return (
      <div className="Smiley" onClick={this.handleClick}>
        <img className="faceIcons" src={this.smiley[this.props.smiley]} alt="smiley face icon" />
      </div>
    );
  }
}

export default Smiley;
