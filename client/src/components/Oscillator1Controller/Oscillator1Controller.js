import React from 'react';
import './Oscillator1Controller.scss';

import { CTX } from 'context/Store';

const Oscillator1Controller = () => {
  const [appState, updateState] = React.useContext(CTX);
  console.log('appstate wavetable: ', appState.fm1Settings.wavetable);

  const handleClick = (e) => {
    updateState({ type: 'CHANGE_OSC1_TYPE', payload: e.target.id });
  };

  const handleFmOffset = (e) => {
    let { value } = e.target;
    value = +value;
    const newFmOffset = value * 20;

    updateState({
      type: 'CHANGE_FM_FREQ_OFFSET',
      payload: newFmOffset,
    });
  };
  const handleFmWaveTableChange = (e) => {
    let { id } = e.target;
    updateState({
      type: 'CHANGE_FM_WAVETABLE',
      payload: id,
    });
  };
  const handleFmGain = (e) => {
    let { value } = e.target;
    if (value == 0) {
      value = 0.00001;
    }
    const numVal = +value;
    updateState({
      type: 'CHANGE_FM_GAIN',
      payload: numVal * 100,
    });
  };
  return (
    <div className='osc1-controller'>
      <button onClick={handleClick} id='sine'>
        sine me
      </button>
      <button onClick={handleClick} id='sawtooth'>
        sawtooth me
      </button>
      <button onClick={handleClick} id='square'>
        square me
      </button>
      <button onClick={handleClick} id='triangle'>
        triangle me
      </button>

      <div>
        fm wavetable:
        <button
          className={`${appState.fm1Settings.wavetable === 'sine' && 'active'}`}
          onClick={handleFmWaveTableChange}
          id='sine'
        >
          sine
        </button>
        <button
          className={`${
            appState.fm1Settings.wavetable === 'sawtooth' && 'active'
          }`}
          onClick={handleFmWaveTableChange}
          id='sawtooth'
        >
          sawtooth
        </button>
        <button
          className={`${
            appState.fm1Settings.wavetable === 'square' && 'active'
          }`}
          onClick={handleFmWaveTableChange}
          id='square'
        >
          square
        </button>
        <button
          className={`${
            appState.fm1Settings.wavetable === 'triangle' && 'active'
          }`}
          onClick={handleFmWaveTableChange}
          id='triangle'
        >
          triangle
        </button>
      </div>
      <div className='frequency'>
        frequency offset: {appState.fm1Settings.freqOffset}
      </div>
      <input type='range' onChange={handleFmOffset} />
      <div className='gain'>
        gain: {appState.fm1Settings.gain}
        <input type='range' onChange={handleFmGain} />
      </div>
    </div>
  );
};

export default Oscillator1Controller;
