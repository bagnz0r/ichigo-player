// @flow
import React, { Component } from 'react';
import Playback from './Playback';
import Button from './UIKit/Button';
import CheckBox from './UIKit/CheckBox';
import styles from './Home.css';

export default class Home extends Component {

  render() {
    return (
      <div className={styles.home}>
        <Playback />
        <div style={{ margin: '8px' }}>
          <Button label="Ichigo UIKit Button" onClick={() => { console.log('Test'); }} />
          <Button label="Ichigo UIKit Button with an icon" icon="fa-user" onClick={() => { console.log('Test'); }} />
          <CheckBox label="Ichigo UIKit CheckBox" />
          <CheckBox label="Ichigo UIKit CheckBox inline" displayInline={true} />
          <CheckBox label="Ichigo UIKit CheckBox inline" displayInline={true} />
        </div>
      </div>
    );
  }

}
