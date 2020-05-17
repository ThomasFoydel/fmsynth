import React from 'react';
import './Oscillator1Controller.scss';
import Slider from 'components/controls/Slider/Slider';
import Selector from 'components/controls/Selector/Selector';

import { CTX } from 'context/Store';

const Oscillator1Controller = () => {
  const [appState, updateState] = React.useContext(CTX);

  const changeOsc1 = (e) => {
    let { value, prop } = e;
    updateState({ type: 'CHANGE_OSC1', payload: { value, prop } });
  };

  const changeOsc2 = (e) => {
    let { value, prop } = e;
    updateState({ type: 'CHANGE_OSC2', payload: { value, prop } });
  };

  return (
    <div className='osc1-controller'>
      <div className='osc1'>
        <div className='center'>osc 1</div>
        <Selector
          onChange={(e) => changeOsc1({ value: e.value, prop: 'type' })}
          options={[
            { text: 'sine', value: 'sine' },
            { text: 'sawtooth', value: 'sawtooth' },
            { text: 'square', value: 'square' },
            { text: 'triangle', value: 'triangle' },
          ]}
        />
        <Slider property='detune' min={-30} max={30} onChange={changeOsc1} />
      </div>

      <div className='osc2'>
        <div className='center'>osc 2</div>
        <Selector
          onChange={(e) => changeOsc2({ value: e.value, prop: 'type' })}
          options={[
            { text: 'sine', value: 'sine' },
            { text: 'sawtooth', value: 'sawtooth' },
            { text: 'square', value: 'square' },
            { text: 'triangle', value: 'triangle' },
          ]}
        />
        <Slider property='detune' min={-30} max={30} onChange={changeOsc2} />
      </div>
    </div>
  );
};

export default Oscillator1Controller;
