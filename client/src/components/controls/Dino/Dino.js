import React, { useContext } from 'react';
import dino from 'imgs/dino.png';
import dino2 from 'imgs/dino2.png';
import Selector from 'components/controls/Selector/Selector';
import InputRange from 'react-input-range';

import { CTX } from 'context/Store';
import './Dino.scss';

const Dino = () => {
  const [appState, updateState] = useContext(CTX);
  const keysPressed = appState.nodes.length > 0;

  const handleFmOffset = (e) => {
    updateState({
      type: 'CHANGE_FM_FREQ_OFFSET',
      payload: e * 20,
    });
  };
  const handleFmWaveTableChange = (e) => {
    let { value } = e;
    updateState({
      type: 'CHANGE_FM_WAVETABLE',
      payload: value,
    });
  };
  const handleFmGain = (e) => {
    // let { value } = e.target;
    if (e === 0) {
      e = 0.00001;
    }

    updateState({
      type: 'CHANGE_FM_GAIN',
      payload: e * 100,
    });
  };

  return (
    <div className='dino-page'>
      <div className='dino-container center'>
        <div className='frequency-modulator'>
          <div className='name'>frequency modulator</div>
          <div className='wavetable-selector'>
            <Selector
              onChange={handleFmWaveTableChange}
              value={appState.fm1Settings.type}
              options={[
                { text: 'sine', value: 'sine' },
                { text: 'sawtooth', value: 'sawtooth' },
                { text: 'square', value: 'square' },
                { text: 'triangle', value: 'triangle' },
              ]}
            />
          </div>
          {/* <div
          className='frequency'
          style={{
            color: 'white',
            background: `rgba(${
              (appState.fm1Settings.freqOffset / 2000) * 255
            }, 0, 0, 1)`,
          }}
        >
          frequency offset: {appState.fm1Settings.freqOffset}
        </div> */}

          <div className='param frequency'>
            <InputRange
              formatLabel={(value, type) => `${value * 20}`}
              step={2}
              maxValue={100}
              minValue={0}
              value={appState.fm1Settings.freqOffset / 20}
              onChange={handleFmOffset}
              showToolTip={false}
            />
            <div className='param-name center'>frequency</div>
          </div>
          {/* <div
          className='gain'
          style={{
            color: 'white',
            background: `rgba(${
              (appState.fm1Settings.gain / 10000) * 255
            }, 0, 0, 1)`,
          }}
        >
          gain: {Math.floor(appState.fm1Settings.gain)}
        </div> */}
          <div className='param gain'>
            <InputRange
              formatLabel={(value, type) => `${value * 100}`}
              step={2}
              maxValue={100}
              minValue={0}
              value={appState.fm1Settings.gain / 100}
              onChange={handleFmGain}
            />
          </div>
          <div className='param-name center'>gain</div>
        </div>
        <div className='dino-innercontainer'>
          <img
            className='dino'
            style={{
              transition: '0.6s ease all',
              filter: `hue-rotate(${
                (appState.fm1Settings.freqOffset / 2000) * 360
              }deg)`,
              transform: `scale(${
                (appState.fm1Settings.gain / 10000) * 0.2 + 0.4
              }) rotate(${(appState.fm1Settings.freqOffset / 2000) * 180}deg)`,
            }}
            src={keysPressed ? dino : dino2}
            alt='dinosaur with boxing gloves'
          />
        </div>
      </div>
    </div>
  );
};

export default Dino;
