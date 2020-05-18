import React, { useContext } from 'react';
import Slider from 'components/controls/Slider/Slider';

import { CTX } from 'context/Store';
import './BitCrusher.scss';

const BitCrusher = () => {
  const [appState, updateState] = useContext(CTX);

  const handleDepth = (e) => {
    updateState({ type: 'CHANGE_BITCRUSH_DEPTH', payload: e.value });
  };

  const handleMix = (e) => {
    let { value } = e;
    value /= 100;
    updateState({ type: 'CHANGE_BITCRUSH_MIX', payload: value });
  };

  return (
    <div className='bitcrusher'>
      <h4 className='name'>bitcrusher</h4>
      <div className='sliders-container'>
        <div className='param'>
          <div className='name'>depth</div>

          <div className='slider'>
            <Slider
              onChange={handleDepth}
              value={appState.bitCrusher.depth}
              property='depth'
              max={8}
            />
          </div>
        </div>

        <div className='param'>
          <div className='name'>mix</div>
          <div className='slider'>
            <Slider
              onChange={handleMix}
              value={appState.bitCrusher.wet * 100}
              property='wet'
              max={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitCrusher;
