import React, { useContext } from 'react';
import Selector from 'components/controls/Selector/Selector';
import Slider from 'components/controls/Slider/Slider';

import './Reverb.scss';

import { CTX } from 'context/Store';

const Reverb = () => {
  const [appState, updateState] = useContext(CTX);

  const handleImpulse = (e) => {
    updateState({ type: 'CHANGE_REVERB_IMPULSE', payload: e.value });
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

        <div className='param impulse-selector'>
          <Selector
            onChange={handleImpulse}
            value={appState.reverb.impulse}
            options={[
              { value: 'block', text: 'block' },
              { value: 'bottleHall', text: 'bottleHall' },
              { value: 'cementBlocks1', text: 'cementBlocks1' },
              { value: 'cementBlocks2', text: 'cementBlocks2' },
              { value: 'chateau', text: 'chateau' },
              { value: 'conic', text: 'conic' },
              { value: 'deep', text: 'deep' },
              { value: 'derlon', text: 'derlon' },
              { value: 'directCab1', text: 'directCab1' },
              { value: 'directCab2', text: 'directCab2' },
              { value: 'directCab3', text: 'directCab3' },
              { value: 'directCab4', text: 'directCab4' },
              { value: 'fiveColumsLong', text: 'fiveColumsLong' },
              { value: 'fiveColumns', text: 'fiveColumns' },
              { value: 'french', text: 'french' },
              { value: 'home', text: 'home' },
              { value: 'greek', text: 'greek' },
              { value: 'dampened', text: 'dampened' },
              { value: 'silo', text: 'silo' },
              { value: 'silo2', text: 'silo2' },
              { value: 'largeBottle', text: 'largeBottle' },
              { value: 'longEcho', text: 'longEcho' },
              { value: 'wideEcho', text: 'wideEcho' },
              { value: 'masonic', text: 'masonic' },
              { value: 'musikvereinsaal', text: 'musikvereinsaal' },
              { value: 'narrowBumpy', text: 'narrowBumpy' },
              { value: 'onAStar', text: 'onAStar' },
              { value: 'parkingGarage', text: 'parkingGarage' },
              { value: 'rays', text: 'rays' },
              { value: 'glassTriangle', text: 'glassTriangle' },
              { value: 'rubyRoom', text: 'rubyRoom' },
              { value: 'milan', text: 'milan' },
              { value: 'smallDrumRoom', text: 'smallDrumRoom' },
              { value: 'prehistoricCave', text: 'prehistoricCave' },
              { value: 'stNicolaes', text: 'stNicolaes' },
              { value: 'trigRoom', text: 'trigRoom' },
              { value: 'vocalDuo', text: 'vocalDuo' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Reverb;
