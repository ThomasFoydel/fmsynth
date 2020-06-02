import React from 'react';
import BitCrusher from 'components/controls/BitCrusher/BitCrusher';
import Distortion from 'components/controls/Distortion/Distortion';
import PingPong from 'components/controls/PingPong/PingPong';
import Reverb from 'components/controls/Reverb/Reverb';
import EQ from 'components/controls/EQ/EQ';

import './Effects.scss';

const Effects = () => {
  return (
    <div className='effects'>
      <EQ />
      <Distortion />
      <div className='flex'>
        <BitCrusher />
        <PingPong />
      </div>

      <Reverb />
    </div>
  );
};

export default Effects;
