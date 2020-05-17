import React from 'react';
import LogRange from './input-range/range';

const LogarithmicSlider = ({ onChange, maxVal, label }) => {
  return <LogRange onChange={onChange} maxval={maxVal} label={label} />;
};

export default LogarithmicSlider;
