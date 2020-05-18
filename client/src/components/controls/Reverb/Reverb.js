import React, { useContext } from 'react';
import Selector from 'components/controls/Selector/Selector';
import Slider from 'components/controls/Slider/Slider';

import './Reverb.scss';

import { CTX } from 'context/Store';

const Reverb = () => {
  const [appState, updateState] = useContext(CTX);

  const handleImpulse = (e) => {
    updateState({ type: 'CHANGE_REVERB_IMPULSE', payload: e.val });
  };
  const handleMix = (e) => {
    let { value } = e;
    value /= 100;
    updateState({ type: 'CHANGE_REVERB_MIX', payload: value });
  };

  return (
    <div className='reverb'>
      <div className='name'>convolver</div>
      <div className='sliders-container'>
        <div className='param'>
          <div className='slider'>
            <Slider
              onChange={handleMix}
              value={appState.reverb.wet * 100}
              property='wet'
              max={100}
            />
          </div>
        </div>

        <div className='param'>
          <Selector
            onChange={handleImpulse}
            value={appState.reverb.impulse}
            options={[
              { val: 'block', text: 'block' },
              { val: 'bottleHall', text: 'bottleHall' },
              { val: 'cementBlocks1', text: 'cementBlocks1' },
              { val: 'cementBlocks2', text: 'cementBlocks2' },
              { val: 'chateau', text: 'chateau' },
              { val: 'conic', text: 'conic' },
              { val: 'deep', text: 'deep' },
              { val: 'derlon', text: 'derlon' },
              { val: 'directCab1', text: 'directCab1' },
              { val: 'directCab2', text: 'directCab2' },
              { val: 'directCab3', text: 'directCab3' },
              { val: 'directCab4', text: 'directCab4' },
              { val: 'fiveColumsLong', text: 'fiveColumsLong' },
              { val: 'fiveColumns', text: 'fiveColumns' },
              { val: 'french', text: 'french' },
              { val: 'home', text: 'home' },
              { val: 'greek', text: 'greek' },
              { val: 'dampened', text: 'dampened' },
              { val: 'silo', text: 'silo' },
              { val: 'silo2', text: 'silo2' },
              { val: 'largeBottle', text: 'largeBottle' },
              { val: 'longEcho', text: 'longEcho' },
              { val: 'wideEcho', text: 'wideEcho' },
              { val: 'masonic', text: 'masonic' },
              { val: 'musikvereinsaal', text: 'musikvereinsaal' },
              { val: 'narrowBumpy', text: 'narrowBumpy' },
              { val: 'onAStar', text: 'onAStar' },
              { val: 'parkingGarage', text: 'parkingGarage' },
              { val: 'rays', text: 'rays' },
              { val: 'glassTriangle', text: 'glassTriangle' },
              { val: 'rubyRoom', text: 'rubyRoom' },
              { val: 'milan', text: 'milan' },
              { val: 'smallDrumRoom', text: 'smallDrumRoom' },
              { val: 'prehistoricCave', text: 'prehistoricCave' },
              { val: 'stNicolaes', text: 'stNicolaes' },
              { val: 'trigRoom', text: 'trigRoom' },
              { val: 'vocalDuo', text: 'vocalDuo' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Reverb;
