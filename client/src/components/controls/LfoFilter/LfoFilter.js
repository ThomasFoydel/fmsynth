import React, { useContext } from 'react';

import './LfoFilter.scss';
import { CTX } from 'context/Store';
import LogarithmicSlider from 'components/controls/LogarithmicSlider/LogarithmicSlider';

import Slider from 'components/controls/Slider/Slider';
import Selector from 'components/controls/Selector/Selector';

const LfoFilter = () => {
  const [appState, updateState] = useContext(CTX);

  const handleMix = (e) => {
    e.value /= 100;
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'wet', value: e.value },
    });
  };

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

  const handleRate = (e) => {
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'frequency', value: e.value },
    });
  };

  const handleBaseFrequency = (e) => {
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'baseFrequency', value: e },
    });
  };

  const handleOctaves = (e) => {
    let { value } = e;
    value /= 10;
    updateState({
      type: 'CHANGE_LFO_FILTER',
      payload: { prop: 'octaves', value },
    });
  };

  const handleFilter = (e, stateProp) => {
    let { prop, value } = e;
    updateState({
      type: 'CHANGE_LFO_FILTER_FILTER',
      payload: { prop, value, stateProp },
    });
  };
  return (
    <div className='lfo-filter'>
      <div className='name center'>lfo filter</div>
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
            onChange={handleRate}
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
        <div className='param'>
          <Selector
            size='medium'
            onChange={(e) =>
              handleFilter({ value: e.value, prop: 'filterType' })
            }
            value={appState.lfoFilter.filterType}
            options={[
              { text: 'lowpass', value: 'lowpass' },
              { text: 'highpass', value: 'highpass' },
              { text: 'bandpass', value: 'bandpass' },
              { text: 'lowshelf', value: 'lowshelf' },
              { text: 'highshelf', value: 'highshelf' },
              { text: 'allpass', value: 'allpass' },
              { text: 'peaking', value: 'peaking' },
            ]}
          />
        </div>
        <div className='param'>
          <Selector
            onChange={(e) =>
              handleFilter({ value: e.value, prop: 'rolloff' }, 'filterRoloff')
            }
            size='medium'
            initVal={appState.lfoFilter.filterRolloff}
            options={[
              { text: '-12', value: -12 },
              { text: '-24', value: -24 },
              { text: '-48', value: -48 },
            ]}
          />
        </div>
      </div>
      <div className='basefreq-slider'>
        <LogarithmicSlider
          onChange={handleBaseFrequency}
          maxVal={20000}
          initVal={appState.lfoFilter.baseFrequency.value}
          label='Hz'
        />
      </div>

      <div className='sliders'>
        <div className='slider'>
          <Slider
            onChange={handleMix}
            value={appState.lfoFilter.wet * 100}
            min={0}
            max={100}
            step={1}
            property='wet'
          />
          <div className='param-name'>mix</div>
        </div>
        <div className='slider'>
          <Slider
            onChange={handleDepth}
            value={appState.lfoFilter.depth * 100}
            min={0}
            max={100}
            step={1}
            property='depth'
          />
          <div className='param-name'>depth</div>
        </div>
        <div className='slider'>
          <Slider
            onChange={handleOctaves}
            value={appState.lfoFilter.octaves}
            min={0}
            max={100}
            step={1}
            property='octaves'
          />
          <div className='param-name'>range</div>
        </div>
        <div className='slider'>
          <Slider
            onChange={(e) => handleFilter(e, 'filterQ')}
            value={appState.lfoFilter.filterQ}
            min={0}
            max={100}
            step={1}
            property='Q'
          />
          <div className='param-name'>Q</div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default LfoFilter;
