import React, { Component, PropTypes } from 'react';
import '../styles/Timer.css';

class Timer extends Component {
  componentDidMount() {
    this.timerID = setInterval(() => {
      if (this.props.active) {
        this.props.tick();
      }
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

Timer.propTypes = {
  active: PropTypes.bool.isRequired,
  time: PropTypes.string.isRequired,
  tick: PropTypes.func.isRequired,
};

export default Timer;
