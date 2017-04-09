// @flow
import React, { Component } from 'react';
import PlaybackControl from './components/PlaybackControl';
import PositionControl from './components/PositionControl';
import styles from './Playback.css';

export default class Playback extends Component {

  render() {
    return (
      <div className={styles.playback}>
        <PlaybackControl />
        <PositionControl />
      </div>
    );
  }

}
