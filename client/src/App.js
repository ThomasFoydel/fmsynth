import React from 'react';
import Store from 'context/Store';
import Keyboard from 'components/Keyboard/Keyboard';

import Cube from 'components/Cube/Cube';

import './App.scss';

function App() {
  const actx = new AudioContext();
  const out = actx.destination;

  const fmOsc = actx.createOscillator();
  const osc1 = actx.createOscillator();

  osc1.frequency.value = 440;
  fmOsc.frequency.value = 440;

  const fmOscGain = actx.createGain();
  fmOscGain.gain.value = 3000;

  const osc1Gain = actx.createGain();
  osc1.connect(osc1Gain);

  fmOsc.connect(fmOscGain);
  fmOscGain.connect(osc1.detune);
  osc1.connect(out);

  return (
    <Store>
      <div className='App'>
        <Cube />
        <Keyboard />
      </div>
    </Store>
  );
}

export default App;
