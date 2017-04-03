import React, { Component, PropTypes } from 'react';
import '../styles/BombCount.css';

class BombCount extends Component {
  constructor(props) {
    super(props);
    this.viewArray = [];
  }

  handleClick = (event) => {
    if (event.type === 'mousedown') {
      this.props.toggle(true, this.viewArray);
    } else if (event.type === 'mouseup') {
      this.props.toggle(false, this.viewArray);
    }
  }

  render() {
    const defused = this.props.list.reduce((prev, curr) => {
      if (prev >= this.props.bombs) return prev;
      return curr.defused ? prev + 1 : prev;
    }, 0);
    let array = (this.props.bombs - defused).toString().split('');
    while (array.length < 3) {
      array.unshift('0');
    }
    array = array.join('');
    return (
      <div
        className="BombCount"
        onMouseDown={this.handleClick}
        onMouseUp={this.handleClick}
      >
        {array}
      </div>
    );
  }
}

BombCount.propTypes = {
  bombs: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default BombCount;
