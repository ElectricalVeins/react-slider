import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Slide from './Slide';
import styles from './Carousel.module.sass';
import transitions from './CarouselTransitions.module.css';
import Controls from './SliderControls';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      nextIndex: 1,
      intervalTime: 2000,
      isFullscreen: false,
      isPlaying: false,
    };

    this.intervalId = null;
  }

  componentWillUnmount() {
    this.stopSlider();
  }

  changeIntervalTime = value => {
    this.stopSlider();
    this.setState({
      intervalTime: value,
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
      this.nextIndex();
    }, this.state.intervalTime);
  };

  currentSlide = () => {
    const { currentIndex } = this.state;
    const { slides } = this.props;
    return slides[currentIndex];
  };

  nextIndex = () => {
    this.setState((state, props) => ({
      currentIndex: (state.currentIndex + 1) % props.slides.length,
    }));
  };

  prevIndex = () => {
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
    const { isPlaying, intervalTime, isFullscreen, currentIndex } = this.state;
    const wrapperStyles = cx({ [styles.fullscreen]: isFullscreen });
    return (
      <div
        className={wrapperStyles}
        style={{ maxWidth: this.props.maxWidth || '1200px' }}>
        <div className={styles.sliderContainer}>
          <div className={styles.hack}>
            <TransitionGroup component={null}>
              <CSSTransition
                key={currentIndex}
                timeout={1000}
                classNames={{ ...transitions }}>
                <Slide {...this.currentSlide()} />
              </CSSTransition>
            </TransitionGroup>
            <Controls
              isFullscreen={isFullscreen}
              isPlaying={isPlaying}
              intervalTime={intervalTime}
              prevIndex={this.prevIndex}
              nextIndex={this.nextIndex}
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
