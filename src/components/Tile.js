import React, { Component, PropTypes } from 'react';
import '../styles/Tile.css';

import defusedMine from '../images/mine4.ico';
import flag from '../images/flag.ico';
import mine from '../images/mine2.ico';
import question from '../images/tile2.ico';
import redMine from '../images/mine.ico';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.icon = {
      defusedMine,
      flag,
      none: mine,
      question,
      redMine,
    };
  }

  displayClass = () => {
    if (!this.props.tile.show) {
      /* Hidden items */
      return 'Tile';
    } else if (this.props.tile.value === 0 || this.props.tile.value === 9) {
      /* 0 value case and bomb case */
      return 'TileShown';
    }
    /* Non zero non-bomb number case */
    return `TileShown num${this.props.tile.value}`;
  }

  displayCenterItem = () => {
    const icon = (<img
      className="icons"
      src={this.icon[this.props.tile.currentIcon]}
      alt="current icon"
    />);

    /* displayed tiles */
    if (this.props.tile.show) {
      if (this.props.tile.value === 0) {
        return '';
      } else if (this.props.tile.value < 9) {
        return this.props.tile.value;
      }
      /* Case when game is active */
      if (this.props.active) {
        return icon;
      /* Case when flag is placed correctly */
      } else if (this.props.tile.defused) {
        return icon;
      }
      /* for question marks, render bombs */
      return (<img
        className="icons"
        src={
          this.props.tile.currentIcon === 'question' ?
          this.icon.none :
          this.icon[this.props.tile.currentIcon]
        }
        alt="current icon"
      />);
    }
    /* undisplayed tiles */
    if (this.props.tile.currentIcon === 'none') {
      return '';
    }
    return icon;
  }

  handleClick = (event) => {
    this.props.smileyChange(event.type);
    if (event.type === 'mousedown' && !this.props.active) {
      this.props.runGame(this.props.tile.id);
    } else if (event.type === 'mouseup') {
      if (this.props.active) {
        this.props.runGame(this.props.tile.id, event);
      } else {
        this.props.reset();
      }
    }
  }

  render() {
    const centerIcon = this.displayCenterItem();
    return (
      <div
        className={this.displayClass()}
        data-active={this.props.active}
        onMouseDown={this.handleClick}
        onMouseUp={this.handleClick}
      >
        { centerIcon }
      </div>
    );
  }
}

Tile.propTypes = {
  active: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  tile: PropTypes.object.isRequired,
  runGame: PropTypes.func.isRequired,
  smileyChange: PropTypes.func.isRequired,
};

export default Tile;
