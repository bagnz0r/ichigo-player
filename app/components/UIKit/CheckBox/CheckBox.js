import React, { Component } from 'react';
import styles from './CheckBox.css';

export default class CheckBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      checked: props.checked
    });
  }

  onClick() {
    this.setState({
      checked: !this.state.checked
    });

    if (this.state.checked && this.props.onChecked) {
      this.props.onChecked();
    } else if (this.props.onUnChecked) {
      this.props.onUnChecked();
    }
  }

  render() {
    const classNames = `${styles.checkBox} ${this.state.checked ? styles.checkBoxChecked : ''} ${this.props.displayInline ? styles.checkBoxInline : ''}`;

    return (
      <div className={classNames} onClick={this.onClick.bind(this)}>
        <div className={styles.checkBoxInner} />
        {this.props.label}
      </div>
    );
  }

}

CheckBox.defaultProps = {
  checked: false,
  label: null,
  displayInline: false,
  onChecked: null,
  onUnChecked: null
};

CheckBox.propTypes = {
  checked: React.PropTypes.bool,
  label: React.PropTypes.string,
  displayInline: React.PropTypes.bool,
  onChecked: React.PropTypes.func,
  onUnChecked: React.PropTypes.func
};
