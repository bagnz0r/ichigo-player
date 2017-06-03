// @flow
import React, { Component } from 'react';
import PlaylistTab from './components/PlaylistTab';

export default class Playlist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTabKey: null
    };
  }

  onTabClick(key) {
    this.setState({
      activeTabKey: key
    });
  }

  render() {
    const playlistTabs = this.props.children.map((child, key) => {
      return (
        <PlaylistTab
          key={child.props.key}
          label={child.props.label}
          onClick={this.onTabClick.bind(this)}
          isActive={this.state.activeTabId === child.props.key}
        />
      );
    });

    return (
      <div>
        {playlistTabs}
      </div>
    );
  }

}
