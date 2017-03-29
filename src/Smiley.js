import React, { Component } from 'react';
import './Smiley.css';
import shades from './images/smiley.ico';
import smiley from './images/smiley1.ico';
import smileyOh from './images/smiley2.ico';
import smileyFail from './images/smiley3.ico';


class Smiley extends Component {
  constructor(props){
    super(props)
    this.smiley = smiley;
  }
  whichSmiley(){
    if(this.props.smiley === 0){
      this.smiley = smiley;
    } else if (this.props.smiley === 1){
      this.smiley = smileyOh;
    } else if (this.props.smiley === 2){
      this.smiley = shades;
    } else if (this.props.smiley === 3){
      this.smiley = smileyFail;
    }
  }
  render() {
    this.whichSmiley();
    return (
      <div className="Smiley">
        <img className="faceIcons" src={this.smiley} alt="smiley face icon" />
      </div>
    );
  }
}
export default Smiley;
