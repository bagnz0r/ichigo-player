// @flow
import React, { Component } from 'react';

import Button from './UIKit/Button';
import CheckBox from './UIKit/CheckBox';
import Playback from './Playback';
import Tab from './UIKit/Tabs/components/Tab';
import Tabs from './UIKit/Tabs';
import styles from './Home.css';

export default class Home extends Component {

  render() {
    return (
      <div className={styles.home}>
        <Playback />
        <Tabs>
          <Tab id="main" label="Main" isActive={true}>
            <CheckBox label="I ain't lyin'" />
            <Button label="I like trains" icon="fa-check" />
            <Button label="I HATE trains" icon="fa-times" />
          </Tab>
          <Tab id="secondary" label="Secondary">
            <CheckBox label="Tits" isInline={true} />
            <CheckBox label="Hoo-hoo" isInline={true} />
          </Tab>
        </Tabs>
      </div>
    );
  }

}
