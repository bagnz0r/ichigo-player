import React, { Component } from 'react';
import styles from './Button.css';

export default class Button extends Component {

  render() {
    const icon = this.props.icon ? <i className={`fa ${this.props.icon}`} /> : '';
    return (
      <button className={styles.button} onClick={this.props.onClick}>
        {icon}
        {this.props.label}
      </button>
    );
  }

}

Button.defaultProps = {
  icon: null
};

Button.propTypes = {
  icon: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};
