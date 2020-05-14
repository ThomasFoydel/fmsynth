import React from 'react';
import BitCrusher from 'components/controls/BitCrusher/BitCrusher';
import Chebyshev from 'components/controls/Chebyshev/Chebyshev';
import PingPong from 'components/controls/PingPong/PingPong';
import Reverb from 'components/controls/Reverb/Reverb';

import './Effects.scss';

const Effects = () => {
  return (
    <div className='effects'>
      <div className='flex'>
        <BitCrusher />
        <Chebyshev />
      </div>

      <PingPong />

      <Reverb />
    </div>
  );
};

export default Effects;
