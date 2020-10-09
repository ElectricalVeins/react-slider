import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Slide.module.sass';

class Slide extends Component {
  render() {
    const { title, imgSrc, description } = this.props;
    return (
      <div className={styles.slideContainer}>
        <span>{description}</span>
        <img src={imgSrc} alt={title} />
      </div>
    );
  }
}

Slide.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Slide;
