import React, { useContext } from 'react';
import './CombFilter.scss';
import { CTX } from 'context/Store';
import Selector from 'components/controls/Selector/Selector';
import Slider from 'components/controls/Slider/Slider';
import InputRange from 'react-input-range';
const CombFilter = () => {
  const [appState, updateState] = useContext(CTX);

  const handleResonance = (e) => {
    e /= 100;
    updateState({
      type: 'CHANGE_COMB_FILTER',
      payload: { value: e, prop: 'resonance' },
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
    <div className='comb-filter'>
      <div className='flex'>
        <div>
          <div className='delay-selector'>
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
          </div>

          <div className='resonance'>
            <InputRange
              value={Math.floor(appState.combFilter.resonance * 100)}
              maxValue={100}
              type='range'
              onChange={handleResonance}
            />
          </div>
        </div>

        <div className='mix-slider'>
          <div className='name'>comb delay</div>
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
    </div>
  );
};

export default CombFilter;
