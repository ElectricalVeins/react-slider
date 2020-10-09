import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Slide from './Slide';
import styles from './Carousel.module.sass';
import Controls from './SliderControls';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      intervalTime: 2000,
      isFullscreen: false,
      isPlaying: false,
    };

    this.intervalId = null;
  }

  componentWillUnmount() {
    this.stopSlider();
  }

  changeIntervalTime = v => {
    this.stopSlider();
    this.setState({
      intervalTime: v,
    });
    this.startSlider();
  };

  stopSlider = () => {
    clearInterval(this.intervalId);
    this.setState({ isPlaying: false });
  };

  startSlider = () => {
    this.setState({ isPlaying: true });
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.state.intervalTime);
  };

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

  changeFullscreen = () => {
    this.setState({
      isFullscreen: !this.state.isFullscreen,
    });
  };

  render() {
    const { isPlaying, intervalTime, isFullscreen } = this.state;
    const wrapperStyles = cx({ [styles.fullscreen]: isFullscreen });
    return (
      <div
        className={wrapperStyles}
        style={{ maxWidth: this.props.maxWidth || '1200px' }}>
        <div className={styles.sliderContainer}>
          <div className={styles.hack}>
            <Slide {...this.currentSlide()} />
            <Controls
              isFullscreen={isFullscreen}
              isPlaying={isPlaying}
              intervalTime={intervalTime}
              prevSlide={this.prevSlide}
              nextSlide={this.nextSlide}
              startSlider={this.startSlider}
              stopSlider={this.stopSlider}
              changeIntervalTime={this.changeIntervalTime}
              changeFullscreen={this.changeFullscreen}
            />
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
