import React, { useContext } from 'react';
import './Distortion.scss';
import { CTX } from 'context/Store';
import Slider from 'components/controls/Slider/Slider';
import Selector from 'components/controls/Selector/Selector';

const Distortion = () => {
  const [appState, updateState] = useContext(CTX);

  const handleMix = (e) => {
    let { value } = e;
    value /= 100;
    updateState({ type: 'CHANGE_DISTORTION_MIX', payload: value });
  };

  const handleOversample = (e) => {
    updateState({ type: 'CHANGE_DISTORTION_OVERSAMPLE', payload: e.value });
  };

  const handleDistortion = (e) => {
    updateState({ type: 'CHANGE_DISTORTION_AMOUNT', payload: e.value });
  };

  return (
    <div className='distortion'>
      <div className='title-name'>distortion</div>
      <div className='sliders-container'>
        <div className='param'>
          <div className='name'>oversample</div>
          <Selector
            value={appState.distortion.oversample}
            onChange={handleOversample}
            size='small'
            options={[
              { text: 'none', value: 'none' },
              { text: '2x', value: '2x' },
              { text: '4x', value: '4x' },
            ]}
          />
        </div>

        <div className='param'>
          <div className='name'>mix</div>
          <Slider
            onChange={handleMix}
            value={appState.distortion.wet * 100}
            property='wet'
            max={100}
          />
        </div>
        <div className='param'>
          <div className='name'>amount</div>
          <Slider
            onChange={handleDistortion}
            value={appState.distortion.distortion * 100}
            property='wet'
            max={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Distortion;
