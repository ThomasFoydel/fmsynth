import React from 'react';
import './Oscillator1Controller.scss';
import Navbar from 'components/Navbar/Navbar';

import { CTX } from 'context/Store';

const Oscillator1Controller = () => {
  const [appState, updateState] = React.useContext(CTX);

  const changeOsc1 = (e) => {
    updateState({ type: 'CHANGE_OSC1_TYPE', payload: e.target.id });
  };

  const changeOsc2 = (e) => {
    updateState({ type: 'CHANGE_OSC2_TYPE', payload: e.target.id });
  };

  return (
    <div className='osc1-controller'>
      <Navbar />
      <div className='osc1'>
        osc 1
        <button
          onClick={changeOsc1}
          id='sine'
          className={`${appState.osc1Settings.type === 'sine' && 'active'}`}
        >
          sine
        </button>
        <button
          onClick={changeOsc1}
          id='sawtooth'
          className={`${appState.osc1Settings.type === 'sawtooth' && 'active'}`}
        >
          sawtooth
        </button>
        <button
          onClick={changeOsc1}
          id='square'
          className={`${appState.osc1Settings.type === 'square' && 'active'}`}
        >
          square
        </button>
        <button
          onClick={changeOsc1}
          id='triangle'
          className={`${appState.osc1Settings.type === 'triangle' && 'active'}`}
        >
          triangle
        </button>
      </div>

      <div className='osc2'>
        osc 2
        <button
          onClick={changeOsc2}
          id='sine'
          className={`${appState.osc2Settings.type === 'sine' && 'active'}`}
        >
          sine
        </button>
        <button
          onClick={changeOsc2}
          id='sawtooth'
          className={`${appState.osc2Settings.type === 'sawtooth' && 'active'}`}
        >
          sawtooth
        </button>
        <button
          onClick={changeOsc2}
          id='square'
          className={`${appState.osc2Settings.type === 'square' && 'active'}`}
        >
          square
        </button>
        <button
          onClick={changeOsc2}
          id='triangle'
          className={`${appState.osc2Settings.type === 'triangle' && 'active'}`}
        >
          triangle
        </button>
      </div>
    </div>
  );
};

export default Oscillator1Controller;
