import React, { Component } from 'react';
import styles from './PlaybackControlButton.css';

export default class PlaybackControlButton extends Component {

  render() {
    return (
      <div className={styles.playbackControlButton} onClick={this.props.onClick}>
        <i className={`fa ${this.props.icon}`} />
      </div>
    );
  }

}

PlaybackControlButton.propTypes = {
  icon: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};
