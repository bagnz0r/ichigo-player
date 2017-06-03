// @flow
import React, { Component } from 'react';
import cx from 'classnames';
import styles from './PlaylistTab.css';

class PlaylistTab extends Component {

  onClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    const classNames = cx([styles.playlistTab, {
      [styles.playlistTabActive]: this.props.isActive
    }]);

    const contentClassNames = cx([styles.playlistTabContent, {
      [styles.playlistTabContentVisible]: this.props.isActive
    }]);

    return (
      <div className={classNames} onClick={this.onClick.bind(this)}>
        {this.props.label}
        <div className={contentClassNames}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

PlaylistTab.defaultProps = {
  onClick: () => {
    console.warn('Event unhandled: PlaylistTab onClick');
  }
}

PlaylistTab.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func,
};

export default PlaylistTab;