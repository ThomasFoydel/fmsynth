import React, { useContext } from 'react';
import './Envelope.scss';
import LogarithmicSlider from 'components/controls/LogarithmicSlider/LogarithmicSlider';
import { CTX } from 'context/Store';

const Envelope = () => {
  const [appState, updateState] = useContext(CTX);

  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <div>
      <LogarithmicSlider
        onChange={handleChange}
        maxVal={20000}
        initVal={appState.filter.frequency}
        label='Hz'
      />
    </div>
  );
};

export default Envelope;
