import React from 'react';
import LogRange from './input-range/range';

const LogarithmicSlider = ({ onChange, maxval }) => {
  return <LogRange onChange={onChange} maxval={maxval} />;
};

export default LogarithmicSlider;
