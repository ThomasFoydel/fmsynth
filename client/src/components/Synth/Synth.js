import React from 'react';
import Oscillator1Controller from 'components/Oscillator1Controller/Oscillator1Controller';
import Keyboard from 'components/Keyboard/Keyboard';

const Synth = () => {
  return (
    <div>
      FM SYNTH
      <Oscillator1Controller />
      <Keyboard />
      <img
        src='https://66.media.tumblr.com/e28c22b6d583ce40066d6a2d7ae12593/97fb01f48ed15198-2e/s500x750/31a63e6162b1f2c85d9003e96104f66199bfd041.png'
        alt='dinosaur with boxing gloves'
      />
    </div>
  );
};

export default Synth;
