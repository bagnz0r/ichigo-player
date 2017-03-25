// @flow
import React, { Component } from 'react';
import Playback from './Playback';
import styles from './Home.css';

export default class Home extends Component {

  render() {
    return (
      <div className={styles.home}>
        <Playback />
      </div>
    );
  }

}
