import React, { useContext } from 'react';
import './Filter.scss';
import { CTX } from 'context/Store';
import CircleSlider from 'components/controls/CircleSlider/Slider';

const Filter = () => {
  const [appState, updateState] = useContext(CTX);

  const handleChange = (e) => {
    console.log('handle change: ', e);
  };

  return (
    <div>
      <CircleSlider
        min={0}
        max={100}
        value={2}
        onChange={handleChange}
        property='frequency'
      />
    </div>
  );
};

export default Filter;
