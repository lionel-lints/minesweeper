import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {time:'000'};
  }

  tick() {
    let newTime = this.state.time.split('');
    newTime = newTime.map((digit) => { return Number(digit) });
    if (newTime[0] + newTime[1] + newTime[2] === 27) return;
    if (newTime[2] + 1 === 10){
      if (newTime[1] + 1 === 10) {
        newTime[0] += 1;
        newTime[1] = 0;
        newTime[2] = 0;
      } else {
        newTime[1] += 1;
        newTime[2] = 0;
      }
    } else {
      newTime[2] += 1;
    }
    newTime = newTime.map((digit) => { return (digit).toString() }).join('');
    this.setState({ time: newTime });
    return newTime;
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick()
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="Timer">
        {this.state.time} 
      </div>
    );
  }
}

export default Timer;
