import React, { Component } from 'react';
import styles from './PositionControl.css';
import TrackBar from '../../../UIKit/TrackBar';

export default class PositionControl extends Component {

  constructor(props) {
    super(props);

    this.state = {
      max: props.max,
      value: props.value
    };
  }

  render() {
    return (
      <div className={styles.positionControl}>
        <TrackBar max={this.state.max} value={this.state.value} />
      </div>
    );
  }

}

PositionControl.defaultProps = {
  max: 0,
  value: 0
};

PositionControl.propTypes = {
  max: React.PropTypes.number,
  value: React.PropTypes.number
};
