import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './TrackBar.css';

export default class TrackBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      style: {
        width: '0%'
      },
      dragEnabled: false,
      mouseEntered: false
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value,
      style: {
        width: props.value ? `${Math.round(props.value * 100)}%` : 0
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

  onMouseEnter() {
    this.setState({
      mouseEntered: true
    });
  }

  onMouseLeave() {
    this.setState({
      mouseEntered: false,
      dragEnabled: false
    });
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
    const val = Math.round((offsetX / rect.width) * 100) / 100;

    this.setState({
      value: val
    });

    if (this.props.onChange) {
      this.props.onChange(val);
    }
  }

  render() {
    const enlarged = this.state.mouseEntered ? styles.trackBarEnlarged : '';

    return (
      <div
        className={`${styles.trackBar} ${enlarged}`}
        onClick={this.onClick.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        onMouseDown={this.onDragEnable.bind(this)}
        onMouseUp={this.onDragDisable.bind(this)}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
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
  value: 0,
  onChange: null
};

TrackBar.propTypes = {
  value: React.PropTypes.number,
  onChange: React.PropTypes.func
};
