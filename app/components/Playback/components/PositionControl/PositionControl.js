import React, { Component } from 'react';
import styles from './PositionControl.css';
import TrackBar from '../../../UIKit/TrackBar';

export default class PositionControl extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  onChange(val) {
    this.setState({
      value: val
    });
  }

  render() {
    return (
      <div className={styles.positionControl}>
        <TrackBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }

}

PositionControl.defaultProps = {
  value: 0
};

PositionControl.propTypes = {
  value: React.PropTypes.number
};
