import React, { useContext } from 'react';
import './CombFilter.scss';
import { CTX } from 'context/Store';
import Selector from 'components/controls/Selector/Selector';
import Slider from 'components/controls/Slider/Slider';

const CombFilter = () => {
  const [appState, updateState] = useContext(CTX);

  const handleChange = (e) => {
    let { value } = e.target;
    value = +value;
    value /= 100;
    updateState({
      type: 'CHANGE_COMB_FILTER',
      payload: { value: value, prop: e.target.id },
    });
  };
  const handleDelay = (e) => {
    updateState({
      type: 'CHANGE_COMB_FILTER',
      payload: { value: e.value, prop: 'delayTime' },
    });
  };

  const handleMix = (e) => {
    let { value, prop } = e;
    value /= 100;
    updateState({
      type: 'CHANGE_COMB_FILTER_CROSSFADE',
      payload: { value, prop },
    });
  };
  return (
    <div>
      <div className='name'>comb delay</div>
      <div className='flex'>
        <div>
          <Selector
            cb={handleDelay}
            initVal={0}
            options={[
              { text: '2n', value: '2n' },
              { text: '2t', value: '2t' },
              { text: '4n', value: '4n' },
              { text: '4t', value: '4t' },
              { text: '8n', value: '8n' },
              { text: '8t', value: '8t' },
              { text: '16n', value: '16n' },
              { text: '16t', value: '16t' },
              { text: '32n', value: '32n' },
              { text: '32t', value: '32t' },
            ]}
          />
          <input type='range' id='resonance' onChange={handleChange} />
        </div>
        <Slider
          onChange={handleMix}
          value={appState.combFilterCrossFade.fade * 100}
          min={0}
          max={100}
          step={1}
          property='fade'
        />
      </div>
    </div>
  );
};

export default CombFilter;
