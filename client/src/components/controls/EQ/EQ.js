import React, { useContext } from 'react';
import Slider from 'components/controls/Slider/Slider';
import LogarithmicRange from 'components/controls/LogarithmicRange/LogarithmicRange';
import './EQ.scss';
import { CTX } from 'context/Store';

const EQ = () => {
  const [appState, updateState] = useContext(CTX);

  const handleGain = (e) => {
    updateState({ type: 'CHANGE_EQ_GAIN', payload: e });
  };
  const handleRange = (e) => {
    updateState({ type: 'CHANGE_EQ_RANGE', payload: e });
  };
  return (
    <div className='EQ'>
      <div className='sliders'>
        <div className='param'>
          <Slider
            onChange={handleGain}
            value={appState.EQ.low}
            min={0}
            max={24}
            step={1}
            property='low'
          />
          <div className='label'>low</div>
        </div>
        <div className='param'>
          <Slider
            onChange={handleGain}
            value={appState.EQ.mid}
            min={0}
            max={24}
            step={1}
            property='mid'
          />
          <div className='label'>mid</div>
        </div>
        <div className='param'>
          <Slider
            onChange={handleGain}
            value={appState.EQ.high}
            min={0}
            max={24}
            step={1}
            property='high'
          />
          <div className='label'>high</div>
        </div>
      </div>
      <div className='range-slider'>
        <LogarithmicRange
          onChange={handleRange}
          label={'Hz'}
          maxVal={20000}
          initVal={appState.EQ}
        />
        <div className='name'>EQ</div>
      </div>
    </div>
  );
};

export default EQ;
