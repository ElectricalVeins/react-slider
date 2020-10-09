import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mdiArrowLeft, mdiArrowRight, mdiPlay } from '@mdi/js';
import Slide from './Slide';
import styles from './Carousel.module.sass';
import SliderControl from './SliderControl';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
    
    this.intervalId = null;
  }

  currentSlide = () => {
    const { currentIndex } = this.state;
    const { slides } = this.props;
    return slides[currentIndex];
  };

  nextSlide = () => {
    this.setState((state, props) => ({
      currentIndex: (state.currentIndex + 1) % props.slides.length,
    }));
  };

  prevSlide = () => {
    this.setState((state, props) => ({
      currentIndex:
        (state.currentIndex - 1 + props.slides.length) % props.slides.length,
    }));
  };

  render() {
    return (
      <div style={{maxWidth: this.props.maxWidth || '1200px'}}>
        <div className={styles.sliderContainer}>
          <div className={styles.hack}>
            <Slide {...this.currentSlide()} />
            <div className={styles.controls}>
              <SliderControl path={mdiArrowLeft} onClick={this.prevSlide} />
              <SliderControl path={mdiPlay} />
              <SliderControl path={mdiArrowRight} onClick={this.nextSlide} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  maxWidth: PropTypes.string,
};

export default Carousel;
