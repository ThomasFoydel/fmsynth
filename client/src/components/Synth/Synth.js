import React, { useContext } from 'react';
import Oscillator1Controller from 'components/Oscillator1Controller/Oscillator1Controller';
import Keyboard from 'components/Keyboard/Keyboard';
import { CTX } from 'context/Store';
import dino from 'imgs/dino.png';
import dino2 from 'imgs/dino2.png';

import './Synth.scss';

const Synth = () => {
  const [appState, updateState] = useContext(CTX);
  const keysPressed = appState.nodes.length > 0;
  return (
    <div className='synth'>
      <div className='synth-name'>FM SYNTH</div>
      <div>
        <Oscillator1Controller />

        <div className='dino-container center'>
          <div className='dino-innercontainer'>
            <img
              className='dino'
              style={{
                transition: '0.6s ease all',
                filter: `hue-rotate(${
                  (appState.fm1Settings.freqOffset / 2000) * 360
                }deg)`,
                transform: `scale(${
                  (appState.fm1Settings.gain / 10000) * 0.4 + 0.5
                }) rotate(${
                  (appState.fm1Settings.freqOffset / 2000) * 360
                }deg)`,
              }}
              src={keysPressed ? dino : dino2}
              alt='dinosaur with boxing gloves'
            />
          </div>
        </div>
        <div className='keyboard-container'>
          <Keyboard />
        </div>
      </div>
    </div>
  );
};

export default Synth;
