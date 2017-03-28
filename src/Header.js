import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  constructor(props){
    super(props);
    this.time = '000';
  }

  render() {
    return (
      <div className="Header">
        <BombCounter bombs={this.props.bombs} />
        <Facey />
        <Counter data-value="clock"/>
      </div>
    );
  }
}

class Counter extends Component {
  constructor(props){
    super(props);
    this.state = {time: '000'};
  }

  tick() {
    let newTime = this.state.time.split('');
    newTime = newTime.map((digit) => { return Number(digit) });

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
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="Counter">
        {this.state.time} 
      </div>
    );
  }
}

class BombCounter extends Component {

  render() {
    return (
      <div className="Counter">
        {this.props.bombs} 
      </div>
    );
  }
}
class Facey extends Component {
  render() {
    return (
      <button className="Facey">
       Facey! 
      </button>
    );
  }
}
export default Header;
