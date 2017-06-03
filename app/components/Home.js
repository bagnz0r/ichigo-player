// @flow
import React, { Component } from 'react';
import Playback from './Playback';
import Playlist from './Playlist';
import PlaylistTab from './Playlist/components/PlaylistTab';
import styles from './Home.css';

export default class Home extends Component {

  render() {
    return (
      <div className={styles.home}>
        <Playback />
        <Playlist>
          <PlaylistTab key="main" label="Main">
            Oh hi
          </PlaylistTab>
          <PlaylistTab key="secondary" label="Secondary">
            Oh hi, dick
          </PlaylistTab>
        </Playlist>
      </div>
    );
  }

}
