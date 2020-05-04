import React from 'react';
import Store from 'context/Store';
import Synth from 'components/Synth/Synth';
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
    // <div>
    //   <button
    //     onClick={() => {
    //       osc1.start();
    //     }}
    //   >
    //     start osc1
    //   </button>
    //   <button
    //     onClick={() => {
    //       fmOsc.start();
    //     }}
    //   >
    //     start fm osc
    //   </button>
    //   <input
    //     type='range'
    //     onChange={(e) => {
    //       const value = +e.target.value;
    //       console.log(value / 100);
    //       fmOsc.frequency.linearRampToValueAtTime(value * 50, actx.currentTime);
    //     }}
    //   />

    //   <input
    //     type='range'
    //     onChange={(e) => {
    //       const value = +e.target.value;
    //       console.log(value / 100);
    //       osc1.frequency.linearRampToValueAtTime(value * 50, actx.currentTime);
    //     }}
    //   />
    // </div>
    <Store>
      <div className='App'>
        {/* <Cube /> */}
        <Synth />
      </div>
    </Store>
  );
}

export default App;
