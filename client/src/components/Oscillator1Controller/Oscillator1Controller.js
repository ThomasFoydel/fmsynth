import React from 'react';
import './Oscillator1Controller.scss';
import Navbar from 'components/Navbar/Navbar';

import { CTX } from 'context/Store';

const Oscillator1Controller = () => {
  const [appState, updateState] = React.useContext(CTX);

  const handleClick = (e) => {
    updateState({ type: 'CHANGE_OSC1_TYPE', payload: e.target.id });
  };

  return (
    <div className='osc1-controller'>
      <Navbar />
      osc wavetable
      <button
        onClick={handleClick}
        id='sine'
        className={`${appState.osc1Settings.type === 'sine' && 'active'}`}
      >
        sine
      </button>
      <button
        onClick={handleClick}
        id='sawtooth'
        className={`${appState.osc1Settings.type === 'sawtooth' && 'active'}`}
      >
        sawtooth
      </button>
      <button
        onClick={handleClick}
        id='square'
        className={`${appState.osc1Settings.type === 'square' && 'active'}`}
      >
        square
      </button>
      <button
        onClick={handleClick}
        id='triangle'
        className={`${appState.osc1Settings.type === 'triangle' && 'active'}`}
      >
        triangle
      </button>
    </div>
  );
};

export default Oscillator1Controller;
