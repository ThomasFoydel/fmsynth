import React, { useContext } from 'react';
import { CircleSlider } from 'react-circle-slider';

import { CTX } from 'context/Store';
import './BitCrusher.scss';

const BitCrusher = () => {
  const [appState, updateState] = useContext(CTX);

  const handleDepth = (e) => {
    updateState({ type: 'CHANGE_BITCRUSH_DEPTH', payload: e });
  };

  const handleMix = (e) => {
    updateState({ type: 'CHANGE_BITCRUSH_MIX', payload: e });
  };

  return (
    <div className='bitcrusher'>
      <h4 className='name'>bitcrusher</h4>
      <div className='sliders-container'>
        <div className='param'>
          <div className='name'>depth</div>

          <div className='slider'>
            <CircleSlider
              onChange={handleDepth}
              value={appState.bitCrusher.depth}
              shadow={false}
              knobRadius={4}
              size={35}
              circleWidth={2}
              progressWidth={5}
              min={1}
              max={8}
              showTooltip={true}
              tooltipSize={12}
              tooltipColor={'#eee'}
              progressColor={'#222'}
            />
          </div>
        </div>

        <div className='param'>
          <div className='name'>mix</div>
          <div className='slider'>
            <CircleSlider
              onChange={handleMix}
              value={appState.bitCrusher.mix}
              knobRadius={4}
              shadow={false}
              size={35}
              circleWidth={2}
              progressWidth={5}
              min={0}
              max={100}
              showTooltip={true}
              tooltipSize={12}
              tooltipColor={'#eee'}
              progressColor={'#222'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitCrusher;
