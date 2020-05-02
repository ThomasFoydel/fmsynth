import React from 'react';

import { CTX } from 'context/Store';

const Oscillator1Controller = () => {
  const [appState, updateState] = React.useContext(CTX);
  //   console.log('OSC 1 SETTINGS: ', appState.osc1Settings);
  const handleClick = (e) => {
    updateState({ type: 'CHANGE_OSC1_TYPE', payload: e.target.id });
  };
  const handleStart = () => {
    updateState({ type: 'START_OSC1' });
  };
  return (
    <div>
      <button onClick={handleStart}>start</button>
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
    </div>
  );
};

export default Oscillator1Controller;
