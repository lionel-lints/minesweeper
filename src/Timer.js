import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
  constructor(props){
    super(props);
  }


  componentDidMount() {
      this.timerID = setInterval(() => {
        if(this.props.active){
          this.props.tick()
        } 
      }, 1000);
    console.log(this.props.active)
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="Timer">
        {this.props.time} 
      </div>
    );
  }
}

export default Timer;
