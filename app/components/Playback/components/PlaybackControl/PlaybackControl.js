import React, { Component } from 'react';
import PlaybackControlButton from './components/PlaybackControlButton';
import styles from './PlaybackControl.css';

export default class PlaybackControl extends Component {

  onClickStop() {
    console.log('Stop clicked? Do something here cunt!');
  }

  onClickPlay() {
    console.log('Play clicked? Do something here cunt!');
  }

  onClickPause() {
    console.log('Pause clicked? Do something here cunt!');
  }

  onClickPrev() {
    console.log('Prev clicked? Do something here cunt!');
  }

  onClickNext() {
    console.log('Next clicked? Do something here cunt!');
  }

  onClickRandom() {
    console.log('Random clicked? Do something here cunt!');
  }

  render() {
    return (
      <div className={styles.playbackControl}>
        <PlaybackControlButton
          icon="fa-stop"
          onClick={this.onClickStop.bind(this)}
        />
        <PlaybackControlButton
          icon="fa-play"
          onClick={this.onClickPlay.bind(this)}
        />
        <PlaybackControlButton
          icon="fa-pause"
          onClick={this.onClickPause.bind(this)}
        />
        <PlaybackControlButton
          icon="fa-step-backward"
          onClick={this.onClickPrev.bind(this)}
        />
        <PlaybackControlButton
          icon="fa-step-forward"
          onClick={this.onClickNext.bind(this)}
        />
        <PlaybackControlButton
          icon="fa-question"
          onClick={this.onClickRandom.bind(this)}
        />
      </div>
    );
  }

}
