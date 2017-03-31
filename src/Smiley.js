import React, { Component } from 'react';
import './Smiley.css';
import shades from './images/smiley.ico';
import smiley from './images/smiley1.ico';
import smileyOh from './images/smiley2.ico';
import smileyFail from './images/smiley3.ico';

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

  render() {
    return (
      <div className="Smiley" onClick={this.props.reset}>
        <img className="faceIcons" src={this.smiley[this.props.smiley]} alt="smiley face icon" />
      </div>
    );
  }
}

export default Smiley;
