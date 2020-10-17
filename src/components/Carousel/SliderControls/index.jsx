import React from 'react';
import PropTypes from 'prop-types';
import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiPlay,
  mdiStop,
  mdiFullscreen,
  mdiFullscreenExit,
} from '@mdi/js';
import SliderControl from './SliderControl';
import styles from './Controls.module.sass';

const Controls = props => {
  const intervalHandler = event => {
    props.changeIntervalTime(event.target.value);
  };

  const {
    isFullscreen,
    intervalTime,
    isPlaying,
    prevIndex,
    nextIndex,
    stopSlider,
    startSlider,
    changeFullscreen,
  } = props;

  return (
    <>
      <input
        type='range'
        className={styles.time}
        value={intervalTime}
        min={500}
        max={5000}
        onChange={intervalHandler}
      />
      <div className={styles.controls}>
        <SliderControl path={mdiArrowLeft} onClick={prevIndex} />
        <SliderControl
          path={isPlaying ? mdiStop : mdiPlay}
          onClick={isPlaying ? stopSlider : startSlider}
        />
        <SliderControl path={mdiArrowRight} onClick={nextIndex} />
        <SliderControl
          path={isFullscreen ? mdiFullscreenExit : mdiFullscreen}
          onClick={changeFullscreen}
        />
      </div>
    </>
  );
};

Controls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  prevIndex: PropTypes.func.isRequired,
  stopSlider: PropTypes.func.isRequired,
  startSlider: PropTypes.func.isRequired,
  nextIndex: PropTypes.func.isRequired,
};

export default Controls;
