// @flow
import React, { Component } from 'react';
import Playback from './Playback';
import Button from './UIKit/Button';
import styles from './Home.css';

export default class Home extends Component {

  render() {
    return (
      <div className={styles.home}>
        <Playback />
        <div style={{ margin: '8px' }}>
          <Button label="Sample button" icon="fa-user" onClick={() => { console.log('cunt'); }} />
          <Button label="I hate you" icon="fa-users" onClick={() => { console.log('cunt'); }} />
        </div>
      </div>
    );
  }

}
