import React, { useContext } from 'react';
import './Filter.scss';
import { CTX } from 'context/Store';
// import BarSlider from 'components/controls/BarSlider/BarSlider';
import Selector from 'components/controls/Selector/Selector';
import LogarithmicSlider from 'components/controls/LogarithmicSlider/LogarithmicSlider';

const Filter = () => {
  const [appState, updateState] = useContext(CTX);

  const handleFrequency = (e) => {
    updateState({
      type: 'CHANGE_FILTER',
      payload: { value: e, prop: 'frequency' },
    });
  };

  const handleType = (e) => {
    updateState({ type: 'CHANGE_FILTER', payload: { value: e, prop: 'type' } });
  };

  return (
    <div className='filter'>
      <div className='name'>filter</div>
      <div className='param'>
        <div className='name'>type</div>
        <Selector
          size='small'
          cb={handleType}
          initVal={0}
          options={[
            { text: 'lowpass', value: 'lowpass' },
            { text: 'highpass', value: 'highpass' },
          ]}
        />
      </div>
      <div className='param'>
        <div className='name'>frequency</div>

        <LogarithmicSlider onChange={handleFrequency} maxval={20000} />
        {/* <BarSlider
          onChange={handleFrequency}
          max={18000}
          property='frequency'
          value={appState.filter.frequency}
          size='large'
        /> */}
      </div>
    </div>
  );
};

export default Filter;
