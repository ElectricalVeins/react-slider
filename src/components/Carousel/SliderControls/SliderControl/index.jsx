import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import styles from './SliderControl.module.sass';

class SliderControl extends Component {
  render() {
    const { onClick, path } = this.props;
    return (
      <div onClick={onClick} className={styles.controlContainer}>
        <Icon path={path} size={2} color='black' />
      </div>
    );
  }
}

SliderControl.propTypes = {
  onClick: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default SliderControl;
