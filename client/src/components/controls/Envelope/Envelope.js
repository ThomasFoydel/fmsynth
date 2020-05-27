import React, { useContext } from 'react';
import './Envelope.scss';
import InputRange from 'react-input-range';
import { CTX } from 'context/Store';

const Envelope = () => {
  const [appState, updateState] = useContext(CTX);

  const handleChange = (e, prop) => {
    if (e === 0) {
      e = 0.5;
    }
    updateState({ type: 'CHANGE_ENVELOPE', payload: { value: e / 20, prop } });
  };

  return (
    <div className='envelope'>
      <div className='param'>
        <div className='param-name'>attack</div>
        <InputRange
          onChange={(e) => handleChange(e, 'attack')}
          maxValue={100}
          value={appState.envelope.attack * 20}
        />
      </div>
      <div className='value-display '>{appState.envelope.attack}</div>
      <div className='param'>
        <div className='param-name'>decay</div>
        <InputRange
          onChange={(e) => handleChange(e, 'decay')}
          maxValue={200}
          value={appState.envelope.decay * 20}
        />
        <div className='value-display '>{appState.envelope.decay}</div>
      </div>
      <div className='param'>
        <div className='param-name'>sustain</div>
        <InputRange
          onChange={(e) => handleChange(e, 'sustain')}
          maxValue={100}
          value={appState.envelope.sustain * 20}
        />
        <div className='value-display '>{appState.envelope.sustain}</div>
      </div>
      <div className='param'>
        <div className='param-name'>release</div>
        <InputRange
          onChange={(e) => handleChange(e, 'release')}
          maxValue={100}
          value={appState.envelope.release * 20}
        />
        <div className='value-display '>{appState.envelope.release}</div>
      </div>
      {/* <LogarithmicSlider
        onChange={handleChange}
        maxVal={20000}
        // initVal={appState.filter.frequency}
        label='Hz'
      /> */}
    </div>
  );
};

export default Envelope;
