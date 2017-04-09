import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './TrackBar.css';

export default class TrackBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      max: props.max,
      value: props.value,
      style: {
        width: '0%'
      },
      dragEnabled: false
    };
  }

  componentWillReceiveProps(props) {
    let w = 0;
    if (props.max && props.value) {
      w = `${(props.value / props.max) * 100}%`;
    }

    this.setState({
      max: props.max,
      value: props.value,
      style: {
        width: w
      }
    });
  }

  onClick(evt) {
    this.setValues(evt.nativeEvent.offsetX);
    this.setState({
      dragEnabled: false
    });
  }

  onMouseMove(evt) {
    if (this.state.dragEnabled) {
      this.setValues(evt.nativeEvent.offsetX);
    }
  }

  onDragEnable() {
    this.setState({
      dragEnabled: true
    });
  }

  onDragDisable() {
    this.setState({
      dragEnabled: false
    });
  }

  setValues(offsetX) {
    const rect = ReactDOM.findDOMNode(this.refs.trackBar).getBoundingClientRect();
    const val = offsetX / rect.width;

    this.setState({
      value: val,
      style: {
        width: `${val * 100}%`
      }
    });
  }

  render() {
    const enlarged = this.state.dragEnabled ? styles.trackBarEnlarged : '';

    return (
      <div
        className={`${styles.trackBar} ${enlarged}`}
        onClick={this.onClick.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        onMouseDown={this.onDragEnable.bind(this)}
        onMouseUp={this.onDragDisable.bind(this)}
        onMouseLeave={this.onDragDisable.bind(this)}
        ref="trackBar"
      >
        <div
          className={`${styles.trackBarInner} ${enlarged}`}
          style={this.state.style}
        />
      </div>
    );
  }

}

TrackBar.defaultProps = {
  max: 0,
  value: 0
};

TrackBar.propTypes = {
  max: React.PropTypes.number,
  value: React.PropTypes.number
};
