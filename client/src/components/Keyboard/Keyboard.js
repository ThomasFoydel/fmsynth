import React, { useEffect, useContext } from 'react';
import QwertyHancock from 'qwerty-hancock';

import { CTX } from 'context/Store';
import './keyboard.scss';

const Keyboard = () => {
  const [appState, updateState] = useContext(CTX);

  const makeOsc = (freq, note) => {
    updateState({ type: 'MAKE_OSC', payload: freq });
  };

  useEffect(() => {
    const keyboard = new QwertyHancock({
      id: 'keyboard',
      width: 820,
      height: 125,
      octaves: 2,
      startNote: 'C5',
      whiteKeyColour: '#1c1c1c',
      blackKeyColour: '#f7f7f7',
      activeColour: '#c70c0c',
      borderColour: '#1c1c1c',
    });
    let nodes = [];

    keyboard.keyDown = (note, freq) => {
      const newOsc1 = makeOsc(freq, note);
      nodes.push(newOsc1);
    };

    keyboard.keyUp = (note, freq) => {
      updateState({ type: 'KILL_OSC', payload: freq });
    };
  }, []);
  return (
    <div className='keyboard-container'>
      <div className='keyboard' id='keyboard'></div>
    </div>
  );
};

export default Keyboard;
