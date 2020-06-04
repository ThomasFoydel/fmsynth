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
      width: 515,
      height: 125,
      octaves: 1.5,
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

  const handleOctaveShift = (e) => {
    let { id } = e.target;
    if (id === 'up') {
      if (appState.keyboardOctaveOffset < 1) {
        updateState({
          type: 'SHIFT_KEYBOARD_OCTAVE',
          payload: appState.keyboardOctaveOffset + 1,
        });
      }
    } else {
      if (appState.keyboardOctaveOffset > -1) {
        updateState({
          type: 'SHIFT_KEYBOARD_OCTAVE',
          payload: appState.keyboardOctaveOffset - 1,
        });
      }
    }
  };
  return (
    <div className='keyboard-area'>
      {appState.keyboardOctaveOffset > -1 && (
        <div className='down-btn' id='down' onClick={handleOctaveShift}></div>
      )}
      <div className='keyboard-container'>
        <div className='keyboard' id='keyboard'></div>
      </div>
      {appState.keyboardOctaveOffset < 1 && (
        <div className='up-btn' id='up' onClick={handleOctaveShift}></div>
      )}
    </div>
  );
};

export default Keyboard;
