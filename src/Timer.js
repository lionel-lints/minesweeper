import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {time:'000'};
  }


  componentDidMount() {
    this.timerID = setInterval(() => {
      this.props.tick()
    }, 1000);
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
