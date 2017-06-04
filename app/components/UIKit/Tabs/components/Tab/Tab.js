// @flow

import React, { Component } from 'react';

import cx from 'classnames';
import styles from './Tab.css';

class Tab extends Component {

  onClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    const classNames = cx([styles.tab, {
      [styles.tabActive]: this.props.isActive
    }]);

    return (
      <div className={classNames} onClick={this.onClick.bind(this)}>
        {this.props.label}
      </div>
    );
  }

}

Tab.defaultProps = {
  isActive: false,
  onClick: () => {
    console.warn('Event unhandled: Tab onClick');
  }
}

Tab.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

export default Tab;