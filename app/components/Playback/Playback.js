// @flow
import React, { Component } from 'react';
import PlaybackControl from './components/PlaybackControl';
import styles from './Playback.css';

export default class Playback extends Component {

  render() {
    return (
      <div className={styles.playback}>
        <PlaybackControl />
      </div>
    );
  }

}
