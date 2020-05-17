import React, { useContext } from 'react';

import './LfoFilter.scss';
import { CTX } from 'context/Store';
import Slider from 'components/controls/Slider/Slider';
import Selector from 'components/controls/Selector/Selector';

const LfoFilter = () => {
  const [appState, updateState] = useContext(CTX);

  const handleDepth = (e) => {
    e.value /= 100;
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'depth', value: e.value },
    });
  };

  const handleType = (e) => {
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'type', value: e.value },
    });
  };

  const changeRate = (e) => {
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'frequency', value: e.value },
    });
  };

  return (
    <div className='lfo-filter'>
      <div className='flex'>
        <div className='selectors'>
          <div className='param'>
            <Selector
              onChange={handleType}
              size='medium'
              initVal={0}
              options={[
                { text: 'sine', value: 'sine' },
                { text: 'sawtooth', value: 'sawtooth' },
                { text: 'square', value: 'square' },
                { text: 'triangle', value: 'triangle' },
              ]}
            />
          </div>
          <div className='param'>
            <Selector
              onChange={changeRate}
              size='medium'
              initVal={0}
              options={[
                { text: '1n', value: '1n' },
                // { text: '1d', value: '1n.' },
                { text: '1t', value: '1t' },

                { text: '2n', value: '2n' },
                // { text: '2d', value: '2n.' },
                { text: '2t', value: '2t' },

                { text: '4n', value: '4n' },
                // { text: '4d', value: '4n.' },
                { text: '4t', value: '4t' },

                { text: '8n', value: '8n' },
                // { text: '8d', value: '8n.' },
                { text: '8t', value: '8t' },

                { text: '16n', value: '16n' },
                // { text: '16d', value: '16n.' },
                { text: '16t', value: '16t' },

                { text: '32n', value: '32n' },
                // { text: '32d', value: '32n.' },
                { text: '32t', value: '32t' },

                { text: '64n', value: '64n' },
                // { text: '64d', value: '64n.' },
                { text: '64t', value: '64t' },
              ]}
            />
          </div>
        </div>

        <div className='section-2'>
          <div className='name'>lfo filter</div>
          <div className='slider'>
            <Slider
              onChange={handleDepth}
              value={appState.lfoFilter.depth * 100}
              min={0}
              max={100}
              step={1}
              property='depth'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LfoFilter;
