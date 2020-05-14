import React, { useContext } from 'react';
import ImpulseSelector from 'components/controls/Reverb/ImpulseSelector/ImpulseSelector';
import { CircleSlider } from 'react-circle-slider';

import './Reverb.scss';
import { CTX } from 'context/Store';

const Reverb = () => {
  const [appState, updateState] = useContext(CTX);

  const handleImpulse = (e) => {
    updateState({ type: 'CHANGE_REVERB_IMPULSE', payload: e.target.value });
  };
  const handleMix = (e) => {
    e /= 100;
    updateState({ type: 'CHANGE_REVERB_MIX', payload: e });
  };

  return (
    <div className='reverb'>
      <div className='name'>convolver</div>
      <div className='sliders-container'>
        <div className='param'>
          {/* <div className='name'>mix</div> */}
          <div className='slider'>
            <CircleSlider
              onChange={handleMix}
              value={appState.reverb.mix * 100}
              knobRadius={4}
              shadow={false}
              size={35}
              circleWidth={3}
              progressWidth={5}
              min={0}
              max={100}
              showTooltip={true}
              tooltipSize={12}
              tooltipColor={'#eee'}
              progressColor={'#222'}
              stepSize={1}
            />
          </div>
        </div>

        <div className='param'>
          <ImpulseSelector
            updateFunction={handleImpulse}
            inputId={'type'}
            initVal={0}
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
