import React, { useContext } from 'react';
import './Filter.scss';
import { CTX } from 'context/Store';
import Selector from 'components/controls/Selector/Selector';
import LogarithmicSlider from 'components/controls/LogarithmicSlider/LogarithmicSlider';
import Slider from 'components/controls/Slider/Slider';

const Filter = () => {
  const [appState, updateState] = useContext(CTX);

  const handleFrequency = (e) => {
    updateState({
      type: 'CHANGE_FILTER',
      payload: { value: e, prop: 'frequency' },
    });
  };

  const handleType = (e) => {
    updateState({
      type: 'CHANGE_FILTER',
      payload: { value: e.value, prop: 'type' },
    });
  };

  const handleRolloff = (e) => {
    updateState({
      type: 'CHANGE_FILTER',
      payload: { value: e.value, prop: 'rolloff' },
    });
  };

  const handleQ = (e) => {
    updateState({
      type: 'CHANGE_FILTER',
      payload: { value: e.value, prop: 'Q' },
    });
  };

  return (
    <div className='filter center'>
      <div className='grid'>
        <div className='grid-div1'>
          <div className='type-selector center'>
            <div className='param'>
              <Selector
                size='medium'
                onChange={handleType}
                initVal={0}
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
                size='medium'
                onChange={handleRolloff}
                initVal={0}
                options={[
                  { text: '-12', value: -12 },
                  { text: '-24', value: -24 },
                  { text: '-48', value: -48 },
                  { text: '-96', value: -96 },
                ]}
              />
            </div>
          </div>
        </div>
        <div className='grid-div2'>
          <div className='q-slider'>
            <div className='q'>Q</div>
            <Slider
              onChange={handleQ}
              // value={appState.lfoFilter.depth * 100}
              min={0}
              max={100}
              step={1}
              property='Q'
            />
          </div>
        </div>
        <div className='grid-div3'>
          <div className='param frequency center'>
            <LogarithmicSlider
              onChange={handleFrequency}
              maxVal={20000}
              initVal={appState.filter.frequency}
              label='Hz'
            />
          </div>
          <div className='name'>filter</div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
