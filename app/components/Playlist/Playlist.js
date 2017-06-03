// @flow
import React, { Component } from 'react';
import PlaylistTab from './components/PlaylistTab';

export default class Playlist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTabId: null
    };
  }

  onTabClick(id) {
    this.setState({
      activeTabId: id
    });
  }

  render() {
    const playlistTabs = this.children.map((child, key) => {
      return (
        <PlaylistTab
          onClick={this.onTabClick.bind(this)}
          isActive={this.state.activeTabId === child.props.id}
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
